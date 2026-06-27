"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeDataProvider = void 0;
const vscode = require("vscode");
const fs = require("fs");
const zlib = require("zlib");
const convert = require("xml-js");
const fileSystemProvider_1 = require("./fileSystemProvider");
const pathjs = require("path");
const child_process_1 = require("child_process");
const MEM_FS_SCHEMA = 'memfs_composer_file';
exports.MEM_FS_SCHEMA = MEM_FS_SCHEMA;
const MEM_FS_FILE = `${MEM_FS_SCHEMA}:/test.tscm`;
let selectedRepository = vscode.workspace.getConfiguration('modscript').get("repositoryFolder");
let composerFolder = process.env.localappdata + `\\Serena\\Studio\\Repository\\Local\\` + selectedRepository;
let solutionsFolder = composerFolder + `\\Serena.Studio.PlugIns.TeamTrack.ObjectModel.TtSolution`;
let javascriptFolder = composerFolder + `\\Serena.Studio.Framework.ObjectModel.JavascriptPart`;
let sbmScriptFolder = composerFolder + `\\Serena.Studio.PlugIns.TeamTrack.ObjectModel.TtScript`;
let sbmTableFolder = composerFolder + `\\Serena.Studio.PlugIns.TeamTrack.ObjectModel.TtTable`; //May end up using this to lookup database names and give intelesense based on this.
let activeProvider = null;  // the live TreeDataProvider instance, so we can refresh it on repo change
let watchers = [];          // current fs.watch handles, replaced when the repository changes
// ── Checked-out script tracking (drives the "Checked out" view + auto-open on checkout) ──
let checkedOutScripts = [];           // [{ id, name, solution, type }] currently checked out
let knownCheckoutIds = new Set();     // ids seen as checked out on the previous scan (for transition detection)
let checkoutInitialized = false;      // skip auto-open on the very first scan after load
const checkoutEmitter = new vscode.EventEmitter();
exports.onCheckoutChanged = checkoutEmitter.event;
exports.getCheckedOutScripts = () => checkedOutScripts.slice();
function openScriptById(id) {
    if (activeProvider) {
        try { activeProvider.openResource(id, true); } catch (e) { console.error('[openScriptById]', e); }
    }
}
exports.openScriptById = openScriptById;

// ── Table/field index (drives DB-field hovers) ──
let fieldIndex = null;
function _xtext(x) { return x && (x._text !== undefined ? x._text : (typeof x === 'string' ? x : '')) || ''; }
function buildFieldIndex() {
    const map = {};  // lowercased field name / db name -> [{ table, name, dbName, type, desc }]
    try {
        for (const d of fs.readdirSync(sbmTableFolder)) {
            const p = `${sbmTableFolder}\\${d}`;
            let nums;
            try { nums = fs.readdirSync(p).filter(f => /^\d+$/.test(f)).map(Number); } catch (e) { continue; }
            if (!nums.length) continue;
            const h = Math.max(...nums);
            let j;
            try { j = JSON.parse(convert.xml2json(zlib.gunzipSync(fs.readFileSync(`${p}\\${h}`)).toString('utf8'), { compact: true })); }
            catch (e) { continue; }
            const t = j.TtTable;
            if (!t || !t.Fields || !t.Fields.ModelObjectList) continue;
            const tableName = _xtext(t.Name);
            const mol = t.Fields.ModelObjectList;
            for (const tk of Object.keys(mol)) {
                if (!/Field$/.test(tk)) continue;
                const type = tk.replace(/^Tt/, '').replace(/Field$/, '');
                const arr = Array.isArray(mol[tk]) ? mol[tk] : [mol[tk]];
                for (const f of arr) {
                    const name = _xtext(f.Name), db = _xtext(f.DatabaseName), desc = _xtext(f.Description);
                    const entry = { table: tableName, name, dbName: db, type, desc };
                    for (const key of [name, db]) {
                        if (key) { const k = key.toLowerCase(); (map[k] = map[k] || []).push(entry); }
                    }
                }
            }
        }
    } catch (e) { console.error('[fieldIndex]', e); }
    return map;
}
function getFieldIndex() { if (!fieldIndex) fieldIndex = buildFieldIndex(); return fieldIndex; }
exports.getFieldIndex = getFieldIndex;

// ── Repo-wide script symbol index ──
// Scans every script's source to learn which classes/functions exist (and where they are
// declared) and how often each is used, so completion can rank by real-world usage and the
// include() quick-fix knows which script to import.
let scriptIndex = null;
function buildScriptIndex() {
    const symbolToScript = {};  // lowercased symbol -> defining script base name (e.g. SoAR_CLASS_AuxCity)
    const freq = {};            // lowercased declared symbol -> usage count across all scripts
    const usage = {};           // lowercased ANY identifier -> total occurrences across all scripts
    const globals = {};         // lowercased global variable name -> defining script base name
    const symbols = {};         // lowercased symbol -> { name, kind, script }
    const contents = [];        // { base, text } for the frequency pass
    // Lightweight content reader (just the script body, no .meta/.S) for the whole folder
    function readBody(folder, partID, contentKey) {
        try {
            const p = `${folder}\\${partID}`;
            const nums = fs.readdirSync(p).filter(f => /^\d+$/.test(f)).map(Number);
            if (!nums.length) return { name: null, text: null };
            const h = Math.max(...nums);
            const file = fs.existsSync(`${p}\\${h}.#`) ? `${p}\\${h}.#` : `${p}\\${h}`;
            const j = JSON.parse(convert.xml2json(zlib.gunzipSync(fs.readFileSync(file)).toString('utf8'), { compact: true }));
            const obj = j[contentKey];
            if (!obj) return { name: null, text: null };
            const tx = v => (v && (v._text !== undefined ? v._text : v)) || '';
            return { name: tx(obj.Name), text: tx(obj.Content) };
        } catch (e) { return { name: null, text: null }; }
    }
    const classRe = /(?:^|[^\w.])class\s+([A-Za-z_]\w*)/g;
    const defRe = /(?:^|[^\w.])def\s+(?:([A-Za-z_]\w*)::)?([A-Za-z_]\w*)\s*\(/g;
    const globalRe = /(?:^|[^\w.])global\s+([A-Za-z_]\w*)/g;
    function declare(name, kind, base) {
        if (!name) return;
        const k = name.toLowerCase();
        if (!symbols[k] || (kind === 'class' && symbols[k].kind !== 'class')) {
            symbols[k] = { name, kind, script: base };
            symbolToScript[k] = base;
        }
    }
    function scanFolder(folder, contentKey) {
        let dirs;
        try { dirs = fs.readdirSync(folder); } catch (e) { return; }
        for (const d of dirs) {
            const { name, text } = readBody(folder, d, contentKey);
            if (!text) continue;
            const base = name || d;
            contents.push({ base, text });
            let m;
            classRe.lastIndex = 0; while ((m = classRe.exec(text))) declare(m[1], 'class', base);
            defRe.lastIndex = 0; while ((m = defRe.exec(text))) { if (m[1]) declare(m[1], 'class', base); else declare(m[2], 'function', base); }
            globalRe.lastIndex = 0; while ((m = globalRe.exec(text))) { const g = m[1].toLowerCase(); if (!globals[g]) globals[g] = base; }
        }
    }
    try {
        // Scan ALL scripts directly (not just those referenced by solutions) so every symbol
        // and global — including library scripts like lbms.lib.core — is covered.
        scanFolder(sbmScriptFolder, 'TtScript');
        scanFolder(javascriptFolder, 'JavascriptPart');
        // Frequency pass: count every identifier across all sources.
        // - freq:  occurrences of declared class/function symbols (for the symbol-completion list)
        // - usage: occurrences of ALL identifiers (drives usage-based ranking + "known" set for diagnostics,
        //          which auto-covers lib.core symbols like VarType_Integer / ReadFlags that aren't in our API)
        const tokRe = /[A-Za-z_]\w*/g;
        for (const c of contents) {
            let m;
            while ((m = tokRe.exec(c.text))) {
                const k = m[0].toLowerCase();
                usage[k] = (usage[k] || 0) + 1;
                if (symbols[k]) freq[k] = (freq[k] || 0) + 1;
            }
        }
    } catch (e) { console.error('[scriptIndex]', e); }
    return {
        symbolToScript, freq, usage, globals,
        symbols: Object.values(symbols).map(s => ({ ...s, freq: freq[s.name.toLowerCase()] || 0 }))
    };
}
function getScriptIndex() { if (!scriptIndex) scriptIndex = buildScriptIndex(); return scriptIndex; }
function invalidateScriptIndex() { scriptIndex = null; }
exports.getScriptIndex = getScriptIndex;
exports.invalidateScriptIndex = invalidateScriptIndex;

// Which application is the user currently working in? Heuristic: the solution whose scripts
// were most recently modified (you check out / edit scripts in the app you're actively using).
function getMainSolutionName() {
    let best = null, bestT = -1;
    function maxMtime(folder, arr) {
        let t = 0;
        if (arr && !Array.isArray(arr)) arr = [arr];
        for (const x of (arr || [])) {
            try {
                const p = `${folder}\\${x.PartID}`;
                const nums = fs.readdirSync(p).filter(f => /^\d+$/.test(f)).map(Number);
                if (!nums.length) continue;
                const h = Math.max(...nums);
                const f = fs.existsSync(`${p}\\${h}.#`) ? `${p}\\${h}.#` : `${p}\\${h}`;
                const mt = fs.statSync(f).mtimeMs;
                if (mt > t) t = mt;
            } catch (e) { }
        }
        return t;
    }
    for (const sol of solutions) {
        const t = Math.max(maxMtime(sbmScriptFolder, sol.sbmscripts), maxMtime(javascriptFolder, sol.javascripts));
        if (t > bestT) { bestT = t; best = sol.name; }
    }
    return best;
}
exports.getMainSolutionName = getMainSolutionName;
// Switch the active repository at runtime (no extension-host restart needed).
// Recomputes all folder paths, reloads solutions, refreshes the tree and re-arms the watchers.
function setRepository(repo) {
    selectedRepository = repo;
    composerFolder = process.env.localappdata + `\\Serena\\Studio\\Repository\\Local\\` + selectedRepository;
    solutionsFolder = composerFolder + `\\Serena.Studio.PlugIns.TeamTrack.ObjectModel.TtSolution`;
    javascriptFolder = composerFolder + `\\Serena.Studio.Framework.ObjectModel.JavascriptPart`;
    sbmScriptFolder = composerFolder + `\\Serena.Studio.PlugIns.TeamTrack.ObjectModel.TtScript`;
    sbmTableFolder = composerFolder + `\\Serena.Studio.PlugIns.TeamTrack.ObjectModel.TtTable`;
    if (!fs.existsSync(solutionsFolder)) {
        throw new Error(`Repository folder not found: ${solutionsFolder}`);
    }
    solutions.length = 0;  // drop the previous repository's solutions before loading the new one
    fieldIndex = null;     // rebuild the table/field index for the new repository on next hover
    scriptIndex = null;    // rebuild the script symbol index for the new repository
    refreshSolutions();
    if (activeProvider) {
        activeProvider.data = [];      // clear cached tree items from the old repository
        activeProvider.fullData = [];
        activeProvider.setDataTree();
        activeProvider.startWatchers();
    }
}
exports.setRepository = setRepository;
function nativeType(value) {
    var nValue = Number(value);
    if (!isNaN(nValue)) {
        return nValue;
    }
    var bValue = value.toLowerCase();
    if (bValue === 'true') {
        return true;
    }
    else if (bValue === 'false') {
        return false;
    }
    return value;
}
var removeJsonTextAttribute = function (value, parentElement) {
    try {
        var keyNo = Object.keys(parentElement._parent).length;
        var keyName = Object.keys(parentElement._parent)[keyNo - 1];
        parentElement._parent[keyName] = nativeType(value);
    }
    catch (e) { }
};
let solutions = [];
refreshSolutions();
exports.solutions = { solutions };
function refreshSolutions() {
    //let solutions = [];
    fs.readdirSync(solutionsFolder).forEach(function (folder) {
        let solution = readComposerFile(`${solutionsFolder}\\${folder}`);
        solution.name = solution.TtSolution.Name;
        try {
            solution.javascripts = solution.TtSolution.JavascriptPartMasterRefs.ModelObjectList.JavascriptPartMasterRef;
        }
        catch (e) {
            solution.javascripts = [];
        }
        try {
            solution.sbmscripts = solution.TtSolution.ScriptMasterRefs.ModelObjectList.TtScriptMasterRef;
        }
        catch (e) {
            solution.sbmscripts = [];
        }
        try {
            solution.tables = solution.TtSolution.TableMasterRefs.ModelObjectList.TtTableMasterRef;
        }
        catch (e) {
            solution.tables = [];
        }
        solution.PartID = solution.TtSolution.ID;
        delete solution.TtSolution;
        delete solution.S;
        delete solution.meta;
        solutions.push(solution);
    });
}
function readComposerFile(path) {
    let highest = 0;
    console.log("TESTAGHHHH");
    // console.log("path: " + path);
    fs.readdirSync(path).forEach(function (file) {
        if (/^\d+$/.test(file)) {
            if (Number(file) > highest) {
                highest = Number(file);
            }
        }
    });
    let fileBuffer;
    if (fs.existsSync(`${path}\\${highest}.#`)) {
        fileBuffer = fs.readFileSync(`${path}\\${highest}.#`);
        //mtime = fs.statSync(`${path}\\${highest}.#`).mtime;
    }
    else {
        fileBuffer = fs.readFileSync(`${path}\\${highest}`);
        //mtime = fs.statSync(`${path}\\${highest}`).mtime;
    }
    let fileString = zlib.gunzipSync(fileBuffer).toString('utf8');
    let file = JSON.parse(convert.xml2json(fileString, { compact: true, spaces: 4, textFn: removeJsonTextAttribute })); //, {compact: true, spaces: 4}
    let fileBufferMeta = fs.readFileSync(`${path}\\${highest}.meta`);
    let fileStringMeta = fileBufferMeta.toString();
    let fileMeta = JSON.parse(convert.xml2json(fileStringMeta, { compact: true, spaces: 4, textFn: removeJsonTextAttribute })); //, {compact: true, spaces: 4}
    file.meta = fileMeta;
    let fileBufferS = fs.readFileSync(`${path}\\${highest}.S`);
    let fileStringS = fileBufferS.toString();
    let fileS = JSON.parse(convert.xml2json(fileStringS, { compact: true, spaces: 4, textFn: removeJsonTextAttribute })); //, {compact: true, spaces: 4}
    file.S = fileS;
    let mtime;
    try {
        mtime = file.TtScript.UpdatedOn;
    }
    catch (error) { }
    try {
        mtime = file.JavascriptPart.UpdatedOn;
    }
    catch (error) { }
    file.mtime = mtime;
    return file;
}
function writeComposerFile(path, content, sbmScript) {
    let highest = 0;
    fs.readdirSync(path).forEach(function (file) {
        if (/^\d+$/.test(file)) {
            if (Number(file) > highest) {
                highest = Number(file);
            }
        }
    });
    let fileBuffer;
    if (fs.existsSync(`${path}\\${highest}.#`)) {
        fileBuffer = fs.readFileSync(`${path}\\${highest}.#`);
    }
    else {
        fileBuffer = fs.readFileSync(`${path}\\${highest}`);
    }
    let fileString = zlib.gunzipSync(fileBuffer).toString('utf8');
    let file = JSON.parse(convert.xml2json(fileString, { compact: true, spaces: 4 })); //, {compact: true, spaces: 4}
    var d = new Date().toISOString().split("-").map(x => x.split("T").map(y => y.split(".").map(z => z.replace("Z", "")))).flat(2);
    if (sbmScript) {
        file.TtScript.Content._text = content;
        file.TtScript.UpdatedOn._text = `${d[1]}/${d[2]}/${d[0]} ${d[3]}#${d[4]}`;
        file.TtScript.UpdatedBy._text = getCurrentLockingUser(path, highest);
    }
    else {
        file.JavascriptPart.Content._text = content;
        file.JavascriptPart.UpdatedOn._text = `${d[1]}/${d[2]}/${d[0]} ${d[3]}#${d[4]}`;
        file.JavascriptPart.UpdatedBy._text = getCurrentLockingUser(path, highest);
    }
    let newXML = convert.json2xml(JSON.stringify(file), { compact: true, ignoreComment: true, spaces: 0, fullTagEmptyElement: true });
    let newBuffer = zlib.gzipSync(newXML);
    try {
        console.log("Writing to: ", `${path}\\${highest}.#`);
        fs.writeFileSync(`${path}\\${highest}.#`, newBuffer, {
            flag: "w+"
        });
    }
    catch (error) {
        console.error(error);
    }
    return;
}
function isComposerFileCheckedOut(path, highest) {
    if (highest === undefined) {
        highest = 0;
        fs.readdirSync(path).forEach(function (file) {
            if (/^\d+$/.test(file)) {
                if (Number(file) > highest) {
                    highest = Number(file);
                }
            }
        });
    }
    let fileBufferS = fs.readFileSync(`${path}\\${highest}.S`);
    let fileStringS = fileBufferS.toString(); //zlib.gunzipSync(fileBufferS).toString('utf8');
    let fileS = JSON.parse(convert.xml2json(fileStringS, { compact: true, spaces: 4, textFn: removeJsonTextAttribute })); //, {compact: true, spaces: 4}
    return fileS.RepositoryStatus.LockState == "LockedByCurrentUser";
}
exports.isComposerFileCheckedOut = isComposerFileCheckedOut;
function getCurrentLockingUser(path, highest) {
    if (highest === undefined) {
        highest = 0;
        fs.readdirSync(path).forEach(function (file) {
            if (/^\d+$/.test(file)) {
                if (Number(file) > highest) {
                    highest = Number(file);
                }
            }
        });
    }
    fs.readdirSync(path).forEach(function (file) {
        if (/^\d+$/.test(file)) {
            if (Number(file) > highest) {
                highest = Number(file);
            }
        }
    });
    let fileBufferS = fs.readFileSync(`${path}\\${highest}.S`);
    let fileStringS = fileBufferS.toString(); //zlib.gunzipSync(fileBufferS).toString('utf8');
    let fileS = JSON.parse(convert.xml2json(fileStringS, { compact: true, spaces: 4, textFn: removeJsonTextAttribute })); //, {compact: true, spaces: 4}
    return fileS.RepositoryStatus.LockingUser;
}

async function expandCollapseAllSolutions(treeView, treeDataProvider) {
    if (!treeView) return;
    for (const solution of treeDataProvider.data) {
        try {
            await treeView.reveal(solution, { expand: true, select: false, focus: false });
            for (const child of solution.children) {
                try {
                    await treeView.reveal(child, { expand: true, select: false, focus: false });
                } catch (error) {
                    console.error(`Error revealing child: ${child.label}`, error);
                }
            }
        } catch (error) {
            console.error(`Error revealing solution: ${solution.label}`, error);
        }
    }
}
exports.expandCollapseAllSolutions = expandCollapseAllSolutions;

class TreeDataProvider {
    constructor(context) {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.context = context;
        vscode.commands.registerCommand('composerExplorer.openFile', (resource) => this.openResource(resource));
        this.memFs = new fileSystemProvider_1.MemFS();
        this.uri = vscode.Uri.parse(MEM_FS_FILE);
        this.editContext = {};
        this.openFiles = {};
        this.data = [];
        this.fullData = [];
        this.activeFilter = { active: false, query: "", fuzzy: false };
        // console.log(this.memFs);
        context.subscriptions.push(vscode.workspace.registerFileSystemProvider(MEM_FS_SCHEMA, this.memFs, {
            isCaseSensitive: true,
        }));
        context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(td => {
            if (td.uri.toString().indexOf(MEM_FS_SCHEMA) != 0) {
                return; //if we are not dealing with a composer file we return. 
            }
            let path, sbmScript, name;
            for (let [key, f] of Object.entries(this.openFiles)) {
                if (f.uri.toString() == td.uri.toString()) {
                    path = f.path;
                    name = f.name;
                    sbmScript = f.sbmScript;
                    break;
                }
            }
            //TODO: Add this back in if I can find a way to force composer to update from cache.
            if (isComposerFileCheckedOut(path)) {
                console.log("Saving to composer file cashe:", td.uri.toString());
                writeComposerFile(path, td.getText(), sbmScript);
            }
            else {
                vscode.window.showErrorMessage(`"${td.fileName}" is not checked out, you can not edit a file that is not first checked out. Save this as a file if you would like to keep these changes.`);
            }
            let exportPath = vscode.workspace.getConfiguration('modscript').get("exportFolder");
            if (!exportPath) {
                exportPath = pathjs.join(getDocumentsFolder(), '\\SBM Composer\\Imports');
            }
            let importPath = pathjs.join(exportPath, "/", name);
            fs.mkdirSync(pathjs.dirname(importPath), { recursive: true });
            fs.writeFileSync(importPath, td.getText());
        }), vscode.workspace.onDidCloseTextDocument(td => {
            if (td.uri.toString().indexOf(MEM_FS_SCHEMA) != 0) {
                return;
            }
            try {
                //this.memFs.delete(td.uri);
            }
            catch (error) {
            }
        }));
        activeProvider = this;
        this.setDataTree();
        this.startWatchers();
    }
    // (Re)establish file watchers on the current repository folders.
    // Called on construction and whenever the active repository changes at runtime.
    startWatchers() {
        // Tear down any previous watchers so we don't keep watching the old repository
        for (const w of watchers) { try { w.close(); } catch (e) { } }
        watchers = [];
        var debouncedWatchFunction = debounce(_ => {
            scriptIndex = null;  // script contents changed → rebuild symbol index on next use
            this.setDataTree();
        }, 300, false);
        var debouncedWatchFunctionSolutions = debounce(_ => {
            scriptIndex = null;
            refreshSolutions();
            this.setDataTree();
        }, 300, false);
        try {
            watchers.push(fs.watch(sbmScriptFolder, { recursive: true }, () => debouncedWatchFunction()));
            watchers.push(fs.watch(javascriptFolder, { recursive: true }, () => debouncedWatchFunction()));
            watchers.push(fs.watch(solutionsFolder, { recursive: true }, () => debouncedWatchFunctionSolutions()));
        } catch (e) {
            console.error('[ComposerController] startWatchers failed:', e);
        }
    }
    refresh() {
        this._onDidChangeTreeData.fire(undefined);
    }
    setDataTree() {
        this.data = [];
        this.fullData = [];
        const scannedCheckedOut = [];  // collected during this scan
        for (let sol of solutions) {
            let solution;
            let create = false;
            try {
                this.memFs.createDirectory(vscode.Uri.parse(`${MEM_FS_SCHEMA}:/${sol.name}/`));
            }
            catch (error) {
            }
            for (let t of this.data) {
                if (t.id == sol.PartID) {
                    solution = t;
                    solution.children[0].children = [];
                    solution.children[1].children = [];
                }
            }
            if (!solution) {
                solution = new TreeItem(sol.name, [new TreeItem("Javascript", [], `${sol.PartID}-javascripts-header`), new TreeItem("Scripts", [], `${sol.PartID}-scripts-header`)], sol.PartID);
                create = true;
            }
            try {
                if (sol.javascripts) {
                    for (let script of sol.javascripts) {
                        let isCheckedout = isComposerFileCheckedOut(`${javascriptFolder}\\${script.PartID}`);
                        const jsId = `${sol.name}/${script.PartID}#javascript`;
                        if (isCheckedout) scannedCheckedOut.push({ id: jsId, name: script.Name, solution: sol.name, type: 'javascript' });
                        const jsItem = new TreeItem(`${script.Name} - ${(isCheckedout) ? "C" : "X"}`, undefined, jsId, `${(isCheckedout) ? "Checked out" : "Locked"}`);
                        try { jsItem.iconPath = pathjs.join(this.context.extensionPath, 'media', 'js.svg'); } catch (e) { }
                        solution.children[0].children.push(jsItem);
                        try {
                            this.openResource(`${sol.name}/${script.PartID}#javascript`, false);
                        } catch (error) {
                            console.error("Tried opening resource: " + error);
                        }
                    }
                }
            }
            catch (e) { }
            try {
                if (sol.sbmscripts) {
                    for (let script of sol.sbmscripts) {
                        let isCheckedout = isComposerFileCheckedOut(`${sbmScriptFolder}\\${script.PartID}`);
                        const scId = `${sol.name}/${script.PartID}#script`;
                        if (isCheckedout) scannedCheckedOut.push({ id: scId, name: script.Name, solution: sol.name, type: 'script' });
                        const scItem = new TreeItem(`${script.Name} - ${(isCheckedout) ? "C" : "X"}`, undefined, scId, `${(isCheckedout) ? "Checked out" : "Locked"}`);
                        try { scItem.iconPath = pathjs.join(this.context.extensionPath, 'media', 'modscript.svg'); } catch (e) { }
                        solution.children[1].children.push(scItem);
                        let file = readComposerFile(`${sbmScriptFolder}\\${script.PartID}`);
                        let content = file.TtScript.Content;
                        let name = file.TtScript.Name + ".tscm";
                        //Preload files on virtual hard disk so that the parser can load them.
                        this.memFs.writeFile(vscode.Uri.parse(`${MEM_FS_SCHEMA}:/${sol.name}/${name}`), Buffer.from(content), {
                            create: true,
                            overwrite: true,
                        });
                        //Load the file so that the parser can parse it.
                        try {
                            this.openResource(`${sol.name}/${script.PartID}#script`, false);
                        } catch (error) {
                            console.error("Tried opening resource: " + error);
                        }
                    }
                }
            }
            catch (e) { }
            if (create) {
                this.data.push(solution);
                this.fullData.push(solution);
            }
        }
        // ── Checkout tracking: detect newly checked-out scripts and auto-open them ──
        const newIds = new Set(scannedCheckedOut.map(s => s.id));
        if (checkoutInitialized) {
            for (const s of scannedCheckedOut) {
                if (!knownCheckoutIds.has(s.id)) {
                    openScriptById(s.id);  // X → C transition: open it in an editor tab
                }
            }
            // C → X transition (check-in): reload the script from disk and re-apply read-only
            // (openResource with true refreshes content in the open editor and sets read-only mode)
            for (const oldId of knownCheckoutIds) {
                if (!newIds.has(oldId)) {
                    try { this.openResource(oldId, true); } catch (e) { console.error('[checkin reload]', e); }
                }
            }
        }
        knownCheckoutIds = newIds;
        checkedOutScripts = scannedCheckedOut;
        checkoutInitialized = true;
        checkoutEmitter.fire();  // refresh the "Checked out" view
        this.refresh();
        if (this.activeFilter.active) {
            this.filter(this.activeFilter.query, this.activeFilter.fuzzy);
        }
    }
    getTreeItem(element) {
        return element;
    }
    getParent(element) {
        for (let solution of this.data) {
            for (let child of solution.children) {
                if (child === element) {
                    return solution;
                }
                for (let grandchild of child.children) {
                    if (grandchild === element) {
                        return child;
                    }
                }
            }
        }
        return null;
    }
    getChildren(element) {
        if (element === undefined) {
            return this.data;
        }
        return element.children;
    }
    openResource(resource, openTextDocument = true) {
        let file, content, name, path, sbmScript;
        if (resource.includes("#javascript")) {
            path = `${javascriptFolder}\\${resource.split("#")[0].split("/")[1]}`;
            file = readComposerFile(path);
            content = Buffer.from(file.JavascriptPart.Content);
            name = resource.split("/")[0] + "/" + file.JavascriptPart.Name + ".js";
            sbmScript = false;
        }
        else if (resource.includes("#script")) {
            path = `${sbmScriptFolder}\\${resource.split("#")[0].split("/")[1]}`;
            // console.log("resource: " + resource);
            file = readComposerFile(path);
            content = Buffer.from(file.TtScript.Content);
            if (file.TtScript.SyntaxType == "ModScript") {
                name = resource.split("/")[0] + "/" + file.TtScript.Name + ".tscm";
            }
            else {
                name = resource.split("/")[0] + "/" + file.TtScript.Name + ".vb";
            }
            sbmScript = true;
        }
        let resourcePartID = 
        // console.log("resource: " + resource);
        // if (this.openFiles.has(resourcePartID) === false) {
            this.openFiles[name] = ({
                uri: vscode.Uri.parse(`${MEM_FS_SCHEMA}:/${name}`),
                PartID: resource.split("#")[0],
                name: name,
                path: path,
                sbmScript: sbmScript
            });
        // }
        // console.log("OPEN RESOURCE: ", name, "  |  ", path);
        // console.log(this.openFiles);
        if (file) {
            // Get the active text editor
            //const editor = vscode.window.activeTextEditor;
            // if(file.S.RepositoryStatus.LockState != "LockedByCurrentUser"){
            //   //vscode.window.showWarningMessage(`File "${name}" is not currently checked out, saving changes will not update Composer.`);
            //   //Not showing the error here, will show when the user goes to save if need be. 
            // }
            //console.log("OPEN RESOURSE: ",name, "  |  ", path);
            let mtime = new Date(file.mtime.replace("#", ".") + " GMT");
            let exportPath = vscode.workspace.getConfiguration('modscript').get("exportFolder");
            if (!exportPath) {
                exportPath = pathjs.join(getDocumentsFolder(), '\\SBM Composer\\Imports');
                fs.mkdirSync(exportPath, { recursive: true });
            }
            let importPath = pathjs.join(exportPath, "/", name);
            if (fs.existsSync(importPath)) {
                if (mtime < fs.statSync(importPath).mtime) {
                    content = fs.readFileSync(importPath);
                }
            }
            // console.log(name);
            // console.log(path);
            // if(){
            // }else{
            // }
            this.memFs.writeFile(vscode.Uri.parse(`${MEM_FS_SCHEMA}:/${name}`), content, {
                create: true,
                overwrite: true,
            });
            // // Check if the file is already open, if so, close it, so it can be reopened in correct mode.
            // const openTabs = vscode.window.tabGroups.all.flatMap(({ tabs }) => tabs.map(tab => {
            //     if (tab.input instanceof vscode.TabInputText || tab.input instanceof vscode.TabInputNotebook) {
            //         return tab.input.uri.path;
            //     }
            //     if (tab.input instanceof vscode.TabInputTextDiff || tab.input instanceof vscode.TabInputNotebookDiff) {
            //         return tab.input.original.path; // also can use modified
            //     }
            //     // others tabs e.g. Settings or webviews don't have URI
            //     return null;
            // }).filter(Boolean));
            // const currentlyProcessedFile = vscode.Uri.parse(`${MEM_FS_SCHEMA}:/${name}`);
            // const isCurrentlyProcessedFileOpen = openTabs.includes(currentlyProcessedFile.path);
            // if (isCurrentlyProcessedFileOpen) {
            //     const currentlyActiveDocument = vscode.window.activeTextEditor.document.uri;
                
            //     // console.log(currentlyActiveDocument, currentlyProcessedFile, openTabs);
            //     vscode.window.showTextDocument(currentlyProcessedFile).then(editor => {
            //         if (!isComposerFileCheckedOut(path)) {
            //             return vscode.commands.executeCommand("workbench.action.files.setActiveEditorReadonlyInSession");
            //         } else {
            //             return vscode.commands.executeCommand("workbench.action.files.setActiveEditorWriteableInSession");
            //         }
            //     }).then(() => {
            //         vscode.window.showTextDocument(currentlyActiveDocument);
            //     }).catch(error => {
            //         console.error("Error processing file:", error);
            //     });
            // }

            if (openTextDocument) {
                // console.log(vscode.Uri.parse(`${MEM_FS_SCHEMA}:/${name}`));
                vscode.workspace.openTextDocument(vscode.Uri.parse(`${MEM_FS_SCHEMA}:/${name}`)).then(doc => {
                    // console.log(doc);
                    vscode.window.showTextDocument(doc, vscode).then(editor => {
                        // console.log(path);
                        if (!isComposerFileCheckedOut(path)) {
                            vscode.window.showWarningMessage(`File "${name}" is not checked out, opening in read-only mode.`);
                            vscode.commands.executeCommand("workbench.action.files.setActiveEditorReadonlyInSession");
                        } else {
                            vscode.commands.executeCommand("workbench.action.files.setActiveEditorWriteableInSession");
                        }
                    });
                    // if(file.S.RepositoryStatus.LockState != "LockedByCurrentUser"){
                    //   this.memFs.delete(vscode.Uri.parse(`${MEM_FS_SCHEMA}:/${name}`));
                    // }
                });
            }
        }
    }
    filter(query, fuzzy = false) {
        if (query === "") {
            this.activeFilter.active = false;
            this.data = this.fullData;
            this.refresh();
            return;
        }
        this.activeFilter = { active: true, query: query, fuzzy: fuzzy };

        let lowerQuery = query.toLowerCase();
        let filteredData = [];
        for (let solution of this.fullData) {
            let children = [];
            for (let child of solution.children) {
                let filteredChildren = [];
                for (let grandchild of child.children) {
                    let add = false;
                    if (fuzzy) {
                        let dist = levenshteinDistance(grandchild.label.slice(0, -4).toLowerCase(), lowerQuery);
                        let lenDiff = grandchild.label.length - 4 - lowerQuery.length;
                        // console.log(grandchild.label.slice(0, -4).toLowerCase(), lowerQuery, dist, lenDiff, dist - lenDiff);
                        if (dist - lenDiff < 1) add = true;
                    } else {
                        if (grandchild.label.toLowerCase().includes(lowerQuery)) add = true;
                    }
                    
                    if (add) {
                        filteredChildren.push(grandchild);
                    }
                }
                if (filteredChildren.length > 0) {
                    children.push(new TreeItem(child.label, filteredChildren, child.id));
                }
            }
            if (children.length > 0) {
                filteredData.push(new TreeItem(solution.label, children, solution.id));
            }
        }
        // console.log(filteredData);
        this.data = filteredData;
        this.refresh();
        return;
    }
}
exports.TreeDataProvider = TreeDataProvider;
class TreeItem extends vscode.TreeItem {
    constructor(label, children, id, tooltip) {
        super(label, children === undefined ? vscode.TreeItemCollapsibleState.None :
            vscode.TreeItemCollapsibleState.Collapsed);
        this.children = children;
        this.id = id;
        this.tooltip = tooltip;
        this.command = { command: 'composerExplorer.openFile', title: "Open File", arguments: [this.id] };
        // Leaf items are scripts → tag them so the "Add to favourites" context menu can target them
        if (children === undefined && typeof id === 'string' && id.indexOf('#') >= 0) {
            this.contextValue = 'composerScript';
        }
    }
}
function debounce(func, wait, immediate) {
    // 'private' variable for instance
    // The returned function will be able to reference this due to closure.
    // Each call to the returned function will share this common timer.
    var timeout;
    // Calling debounce returns a new anonymous function
    return function () {
        // reference the context and args for the setTimeout function
        var context = this, args = arguments;
        // Should the function be called now? If immediate is true
        //   and not already in a timeout then the answer is: Yes
        var callNow = immediate && !timeout;
        // This is the basic debounce behaviour where you can call this 
        //   function several times, but it will only execute once 
        //   [before or after imposing a delay]. 
        //   Each time the returned function is called, the timer starts over.
        clearTimeout(timeout);
        // Set the new timeout
        timeout = setTimeout(function () {
            // Inside the timeout function, clear the timeout variable
            // which will let the next execution run when in 'immediate' mode
            timeout = null;
            // Check if the function already ran with the immediate flag
            if (!immediate) {
                // Call the original function with apply
                // apply lets you define the 'this' object as well as the arguments 
                //    (both captured before setTimeout)
                func.apply(context, args);
            }
        }, wait);
        // Immediate mode and no wait timer? Execute the function..
        if (callNow)
            func.apply(context, args);
    };
}
let savedDocumentFolderPath;
function getDocumentsFolder() {
    //Cant do it this way due to "PowerShell Constrained Language Mode" blocking this on some computers
    //return execSync("powershell.exe -command \"[Environment]::GetFolderPath([Environment+SpecialFolder]::MyDocuments)\"").toString().replace(/\r\n/g,"");
    if (!savedDocumentFolderPath) {
        let userDocumentFolder = child_process_1.execSync(`powershell.exe -command "reg query \\"HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\User Shell Folders\\" /v Personal"`).toString().split("REG_EXPAND_SZ")[1].trim();
        userDocumentFolder = resolveToAbsolutePath(userDocumentFolder);
        savedDocumentFolderPath = userDocumentFolder;
    }
    return savedDocumentFolderPath;
}
function resolveToAbsolutePath(path) {
    return path.replace(/%([^%]+)%/g, function (_, key) {
        return process.env[key];
    });
}
const levenshteinDistance = (s, t) => {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
      arr[i] = [i];
      for (let j = 1; j <= s.length; j++) {
        arr[i][j] =
          i === 0 ? j : Math.min(
            arr[i - 1][j] + 1, 
            arr[i][j - 1] + 1, 
            arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
        );
      }
    }
    return arr[t.length][s.length];
  };
//# sourceMappingURL=ComposerController.js.map