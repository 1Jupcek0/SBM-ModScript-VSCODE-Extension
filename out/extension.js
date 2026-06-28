"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
const vscode = require("vscode");
const path = require("path");
const ComposerController_1 = require("./ComposerController");
const { isComposerFileCheckedOut } = require('./ComposerController');
const fs = require("fs");
const SBM = require("./classes");
var treeDataProvider;
var treeView;
var classes = SBM.classes;
var freeFunctionClasses = [];
for (const [clsName, cls] of Object.entries(classes)) {
    if (cls.className == "") {
        freeFunctionClasses.push(clsName);
    }
}
var freeClasses = [];
for (let cl of freeFunctionClasses) {
    freeClasses.push(classes[cl]);
}
let globalVars = {};
let globalFuncs = {};
let globalClasses = {};
let diagnosticCollection;
let outlineProvider;
let classBrowserPanel = null;
let settingsPanel = null;
let welcomePanel = null;
let eventViewerPanel = null;
let scriptSearchPanel = null;
const Ranges_1 = require("./Ranges");
let languageKeywords = ["var", "global", "def", "try", "catch", "finally", "if", "else", "while", "for", "case", "default", "switch", "return", "break", "continue", "this"];
/**
 * Activates the extension and registers various providers for the "modscript" language.
 * 
 * @param {vscode.ExtensionContext} context - The context in which the extension is activated.
 */
// Standalone diagnostics — runs independently of ParseDocument so a parse failure never hides errors.
// Flags identifiers (including bare assignment targets like `kys = 123`) that are not declared
// anywhere in the script, its includes, or the wider repository.
function runDiagnostics(document) {
    if (!diagnosticCollection || !document || document.languageId !== 'modscript') return;
    const cfg = vscode.workspace.getConfiguration('modscript');
    if (!cfg.get('enableDiagnostics', true) || !cfg.get('checkUndefinedVariables', true)) {
        diagnosticCollection.set(document.uri, []);
        return;
    }
    try {
        const uri = document.uri.toString();
        const varList = globalVars[uri] || [];
        const newMeathods = globalFuncs[uri] || [];
        const newClasses = globalClasses[uri] || [];
        const known = new Set();
        const addName = n => { if (n) known.add(String(n).toLowerCase()); };
        languageKeywords.forEach(addName);
        ['true', 'false', 'null', 'this', 'fun', 'attr', 'global', 'in', 'is', 'new', 'void', 'me',
         'class', 'include', 'do', 'then', 'and', 'or', 'not', 'each', 'as'].forEach(addName);
        ['bool', 'int', 'integer', 'string', 'double', 'float', 'long', 'date', 'datetime', 'time',
         'variant', 'object', 'char', 'byte', 'short', 'decimal', 'number'].forEach(addName);
        for (const v of varList) addName(v.variable);
        for (const f of newMeathods) addName(f.meathodName);
        for (const c of newClasses) { addName(c.className); for (const m of (c.meathods || [])) addName(m.meathodName); for (const p of (c.properties || [])) addName(p.propertyName); }
        for (const [, cls] of Object.entries(classes)) {
            if (cls.className) addName(cls.className);
            for (const m of (cls.meathods || [])) addName(m.meathodName);
            for (const p of (cls.properties || [])) addName(p.propertyName);
        }
        try {
            const idx = ComposerController_1.getScriptIndex();
            if (idx && idx.usage) for (const k of Object.keys(idx.usage)) known.add(k);
            if (idx && idx.globals) for (const k of Object.keys(idx.globals)) known.add(k);
        } catch (e) { }

        // Comment/string-free mask of each line (handles /* */ across lines)
        const masked = [];
        let inBlock = false;
        for (let li = 0; li < document.lineCount; li++) {
            const raw = document.lineAt(li).text;
            let out = '', j = 0;
            while (j < raw.length) {
                if (inBlock) {
                    if (raw[j] === '*' && raw[j + 1] === '/') { inBlock = false; out += '  '; j += 2; }
                    else { out += ' '; j++; }
                } else if (raw[j] === '/' && raw[j + 1] === '*') { inBlock = true; out += '  '; j += 2; }
                else if (raw[j] === '/' && raw[j + 1] === '/') { out += ' '.repeat(raw.length - j); break; }
                else { out += raw[j]; j++; }
            }
            out = out.replace(/"[^"]*"/g, m => ' '.repeat(m.length)).replace(/'[^']*'/g, m => ' '.repeat(m.length));
            masked.push(out);
        }
        // Local DECLARATIONS only (var/global/attr X, for-item, catch param, def params).
        // Bare assignments (X = ... / X := ...) are NOT declarations — assigning to an
        // undeclared name is an error and should be reported.
        const fullMasked = masked.join('\n');
        let dm;
        const declRe = /\b(?:var|global|attr)\s+([A-Za-z_]\w*)/g;
        while ((dm = declRe.exec(fullMasked))) addName(dm[1]);
        const forRe = /\bfor\s*\(\s*(?:[A-Za-z_]\w*\s+)?([A-Za-z_]\w*)\s*:/g;
        while ((dm = forRe.exec(fullMasked))) addName(dm[1]);
        const catchRe = /\bcatch\s*\(\s*(?:[A-Za-z_]\w*\s+)?([A-Za-z_]\w*)\s*\)/g;
        while ((dm = catchRe.exec(fullMasked))) addName(dm[1]);
        const paramRe = /\bdef\s+(?:[A-Za-z_]\w*::)?[A-Za-z_]\w*\s*\(([^)]*)\)/g;
        while ((dm = paramRe.exec(fullMasked))) {
            for (let part of dm[1].split(',')) {
                const toks = part.trim().split(/\s+/);
                if (toks.length) addName(toks[toks.length - 1]);
            }
        }

        const diags = [];
        const reIdent = /[A-Za-z_]\w*/g;
        for (let li = 0; li < masked.length; li++) {
            const text = masked[li];
            if (/^\s*include\s*\(/.test(text)) continue;
            let m;
            while ((m = reIdent.exec(text))) {
                const word = m[0], start = m.index;
                if (/^\d/.test(word)) continue;
                const before = text.slice(0, start);
                const after = text.slice(start + word.length);
                if (/[.]\s*$/.test(before)) continue;                        // member access  x.word
                if (/^\s*\(/.test(after)) continue;                          // function call   word(
                if (/^\s*::/.test(after) || /::\s*$/.test(before)) continue;  // Class::method
                if (/(?:\bdef|\bvar|\bglobal|\battr|\bclass|\bcase|\bcatch|\bfor)\s*[\(\s]$/.test(before)) continue; // declaration target
                if (known.has(word.toLowerCase())) continue;
                const range = new vscode.Range(li, start, li, start + word.length);
                diags.push(new vscode.Diagnostic(range, `'${word}' is not defined in this script or its includes.`, vscode.DiagnosticSeverity.Error));
            }
        }
        diagnosticCollection.set(document.uri, diags);
    } catch (e) {
        console.error('[runDiagnostics] failed for', document.uri.toString(), e);
    }
}

// Re-rank completion items by how often each label is actually used across the project's scripts.
// Items with explicit priority sortText ('~' snippets, '0_' repo symbols) are left untouched.
function applyUsageRanking(items) {
    if (!items || !items.length) return items;
    let usage;
    try { usage = ComposerController_1.getScriptIndex().usage; } catch (e) { return items; }
    if (!usage) return items;
    for (const it of items) {
        const label = typeof it.label === 'string' ? it.label : (it.label && it.label.label) || '';
        if (!label) continue;
        if (it.sortText && (it.sortText[0] === '~' || it.sortText.startsWith('0_'))) continue;
        const f = usage[label.toLowerCase()] || 0;
        const rank = String(Math.max(0, 100000 - f)).padStart(6, '0');
        it.sortText = '1_' + rank + '_' + label;
    }
    return items;
}

function activate(context) {
    // Register the tree data provider and tree view
    treeDataProvider = new ComposerController_1.TreeDataProvider(context);
    treeView = vscode.window.createTreeView('composerExplorer', {
        showCollapseAll: true,
        treeDataProvider: treeDataProvider
    });

    vscode.window.registerTreeDataProvider('composerExplorer', treeDataProvider);

    // Show the active repository name next to the view title, e.g. "Composer Explorer - CDT-SBM-02"
    function updateExplorerTitle() {
        const repo = String(vscode.workspace.getConfiguration('modscript').get('repositoryFolder') || '');
        let name = repo ? '#' + repo : '';
        try {
            const root = path.join(process.env.localappdata || '', 'Serena', 'Studio', 'Repository', 'Local');
            const info = parseStripe(root)[repo];
            if (info && info.server) name = info.server;
        } catch (e) { /* fall back to folder number */ }
        treeView.title = name ? 'Composer Explorer - ' + name : 'Composer Explorer';
    }
    updateExplorerTitle();

    // Auto-expand the application the user is currently working in
    // (the solution whose scripts were edited/checked out most recently)
    function expandMainApplication() {
        try {
            const sols = treeDataProvider.data || [];
            if (!sols.length) return;
            let target = null;
            let mainName = null;
            try { mainName = ComposerController_1.getMainSolutionName(); } catch (e) { }
            if (mainName) target = sols.find(s => s.label === mainName || (s.label && s.label.label === mainName));
            if (!target) {
                // fallback: most scripts
                let bestCount = -1;
                for (const s of sols) {
                    const ch = s.children || [];
                    const count = ((ch[0] && ch[0].children) || []).length + ((ch[1] && ch[1].children) || []).length;
                    if (count > bestCount) { bestCount = count; target = s; }
                }
            }
            if (target) {
                treeView.reveal(target, { expand: 1, focus: false, select: false });
                // Expand BOTH the Javascript and Scripts folders of the application at once
                for (const child of (target.children || [])) {
                    try { treeView.reveal(child, { expand: 1, focus: false, select: false }); } catch (e) { }
                }
            }
        } catch (e) { console.error('[expandMainApplication]', e); }
    }
    setTimeout(expandMainApplication, 1500);

    // Register the file search bar
    context.subscriptions.push(vscode.commands.registerCommand("extension.searchComposerFiles", async () => {
        const query = await vscode.window.showInputBox({ placeHolder: 'Search files in Composer Explorer' });
        if (query !== undefined) {
            treeDataProvider.filter(query, false);
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand("extension.searchComposerFilesFuzzy", async () => {
        const query = await vscode.window.showInputBox({ placeHolder: 'Search files in Composer Explorer' });
        if (query !== undefined) {
            treeDataProvider.filter(query, true);
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand("extension.composerSearchStop", async () => {
        treeDataProvider.filter("");
    }));
    context.subscriptions.push(vscode.commands.registerCommand("extension.composerRefreshRepository", async () => {
        await vscode.commands.executeCommand("workbench.action.restartExtensionHost");
    }));
    context.subscriptions.push(vscode.commands.registerCommand("extension.composerOpenSettings", async () => {
        await vscode.commands.executeCommand("workbench.action.openSettingsJson");
    }));

    // ─── Graphical settings panel ─────────────────────────────────────────────
    // stripe.tab maps each cache folder number to the server it was checked out from.
    // Line format: "<url>:<user>,<folderNumber>"  e.g. "http://cdt-sbm-02:80/.../apprepositoryservice:jaroslav špaček,1"
    function parseStripe(root) {
        const map = {};
        try {
            const raw = fs.readFileSync(path.join(root, 'stripe.tab'), 'utf8');
            for (const lineRaw of raw.split(/\r?\n/)) {
                const line = lineRaw.trim();
                if (!line) continue;
                const comma = line.lastIndexOf(',');
                if (comma < 0) continue;
                const num = line.slice(comma + 1).trim();
                const before = line.slice(0, comma);          // "<url>:<user>"
                const lastColon = before.lastIndexOf(':');
                const url = lastColon >= 0 ? before.slice(0, lastColon) : before;
                const user = lastColon >= 0 ? before.slice(lastColon + 1).trim() : '';
                const hostMatch = url.match(/https?:\/\/([^:/]+)/i);
                const server = hostMatch ? hostMatch[1].toUpperCase() : url;
                map[num] = { server, user, url };
            }
        } catch (e) { /* no stripe.tab — fall back to folder numbers */ }
        return map;
    }

    function listRepositories() {
        const root = path.join(process.env.localappdata || '', 'Serena', 'Studio', 'Repository', 'Local');
        const stripe = parseStripe(root);
        const repos = [];
        try {
            for (const name of fs.readdirSync(root)) {
                const full = path.join(root, name);
                let isDir = false;
                try { isDir = fs.statSync(full).isDirectory(); } catch (e) { continue; }
                if (!isDir) continue;
                const info = stripe[name];
                repos.push({
                    name,
                    path: full,
                    server: info ? info.server : '',          // friendly repository/server name, e.g. CDT-SBM-02
                    user: info ? info.user : '',
                    label: info ? (info.user ? info.user : '') : ''
                });
            }
        } catch (e) {
            console.error('[settings] cannot read repository root', root, e);
        }
        // Show named repositories first
        repos.sort((a, b) => (b.server ? 1 : 0) - (a.server ? 1 : 0));
        return { root, repos };
    }

    function sendSettingsData() {
        if (!settingsPanel) return;
        const cfg = vscode.workspace.getConfiguration('modscript');
        const { root, repos } = listRepositories();
        settingsPanel.webview.postMessage({
            cmd: 'init',
            root,
            repos,
            repositoryFolder: cfg.get('repositoryFolder') || '',
            exportFolder: cfg.get('exportFolder') || '',
            toggles: {
                enableCompletion: cfg.get('enableCompletion', true),
                enableDiagnostics: cfg.get('enableDiagnostics', true),
                checkUndefinedVariables: cfg.get('checkUndefinedVariables', true),
                enableHover: cfg.get('enableHover', true),
                enableSignatureHelp: cfg.get('enableSignatureHelp', true)
            }
        });
    }

    context.subscriptions.push(vscode.commands.registerCommand("extension.openSettingsPanel", () => {
        if (settingsPanel) {
            settingsPanel.reveal(vscode.ViewColumn.Active, false);
            sendSettingsData();
            return;
        }
        settingsPanel = vscode.window.createWebviewPanel(
            'modscriptSettings',
            'Modscript Settings',
            vscode.ViewColumn.Active,
            { enableScripts: true, retainContextWhenHidden: true }
        );
        settingsPanel.webview.html = getSettingsPanelHtml();
        settingsPanel.webview.onDidReceiveMessage(async msg => {
            const cfg = vscode.workspace.getConfiguration('modscript');
            if (msg.cmd === 'ready') {
                sendSettingsData();
            } else if (msg.cmd === 'browseExport') {
                const picked = await vscode.window.showOpenDialog({
                    canSelectFolders: true, canSelectFiles: false, canSelectMany: false,
                    openLabel: 'Select export folder'
                });
                if (picked && picked[0]) {
                    settingsPanel.webview.postMessage({ cmd: 'exportPicked', path: picked[0].fsPath });
                }
            } else if (msg.cmd === 'save') {
                try {
                    const prevRepo = String(cfg.get('repositoryFolder') || '');
                    const newRepo = String(msg.repositoryFolder || '');
                    await cfg.update('repositoryFolder', msg.repositoryFolder || null, vscode.ConfigurationTarget.Global);
                    await cfg.update('exportFolder', msg.exportFolder || null, vscode.ConfigurationTarget.Global);
                    if (msg.toggles) {
                        for (const [k, v] of Object.entries(msg.toggles)) {
                            await cfg.update(k, !!v, vscode.ConfigurationTarget.Global);
                        }
                    }
                    settingsPanel.webview.postMessage({ cmd: 'saved' });
                    // Switch the Composer Explorer to the new repository live — no host restart,
                    // so it works every time you change it (including switching back).
                    if (newRepo !== prevRepo) {
                        try {
                            ComposerController_1.setRepository(newRepo);
                            updateExplorerTitle();
                            if (diagnosticCollection) diagnosticCollection.clear();  // drop the old repo's problems
                            setTimeout(expandMainApplication, 1200);
                            vscode.window.showInformationMessage('Composer Explorer switched to repository ' + newRepo + '.');
                        } catch (re) {
                            vscode.window.showErrorMessage('Could not load repository ' + newRepo + ': ' + re.message);
                        }
                    }
                } catch (e) {
                    vscode.window.showErrorMessage('Could not save settings: ' + e.message);
                }
            } else if (msg.cmd === 'openKeybindings') {
                await vscode.commands.executeCommand('workbench.action.openGlobalKeybindings', 'Modscript');
            } else if (msg.cmd === 'openSettingsJson') {
                await vscode.commands.executeCommand('workbench.action.openSettingsJson');
            }
        }, undefined, context.subscriptions);
        settingsPanel.onDidDispose(() => { settingsPanel = null; }, null, context.subscriptions);
    }));

    // ─── Welcome / Getting started page ───────────────────────────────────────
    function openWelcome() {
        if (welcomePanel) { welcomePanel.reveal(vscode.ViewColumn.Active, false); return; }
        welcomePanel = vscode.window.createWebviewPanel(
            'modscriptWelcome',
            'Welcome to Modscript',
            vscode.ViewColumn.Active,
            { enableScripts: true, retainContextWhenHidden: true, localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))] }
        );
        const mediaUri = welcomePanel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'media')));
        welcomePanel.webview.html = getWelcomeHtml(mediaUri.toString());
        welcomePanel.webview.onDidReceiveMessage(async msg => {
            if (msg.cmd === 'openReference') await vscode.commands.executeCommand('extension.openClassBrowser');
            else if (msg.cmd === 'openSettings') await vscode.commands.executeCommand('extension.openSettingsPanel');
            else if (msg.cmd === 'revealOutline') await vscode.commands.executeCommand('modscriptOutline.focus');
            else if (msg.cmd === 'openComposer') await vscode.commands.executeCommand('composerExplorer.focus');
        }, undefined, context.subscriptions);
        welcomePanel.onDidDispose(() => { welcomePanel = null; }, null, context.subscriptions);
    }
    context.subscriptions.push(vscode.commands.registerCommand('extension.openWelcome', openWelcome));

    // ─── Windows Event Viewer panel ───────────────────────────────────────────
    const cp = require('child_process');
    // Hostname of the server the active repository is connected to (from stripe.tab)
    function getRepoServerHost() {
        try {
            const repo = String(vscode.workspace.getConfiguration('modscript').get('repositoryFolder') || '');
            const root = path.join(process.env.localappdata || '', 'Serena', 'Studio', 'Repository', 'Local');
            const info = parseStripe(root)[repo];
            if (info && info.url) {
                const mm = info.url.match(/https?:\/\/([^:/]+)/i);
                if (mm) return mm[1];
            }
        } catch (e) { }
        return '';
    }
    // All distinct server hosts across every connected repository (for the Computer dropdown)
    function getAllRepoHosts() {
        const hosts = [];
        try {
            const root = path.join(process.env.localappdata || '', 'Serena', 'Studio', 'Repository', 'Local');
            const map = parseStripe(root);
            for (const k of Object.keys(map)) {
                const mm = map[k].url && map[k].url.match(/https?:\/\/([^:/]+)/i);
                if (mm && hosts.indexOf(mm[1]) < 0) hosts.push(mm[1]);
            }
        } catch (e) { }
        return hosts;
    }
    function fetchWinEvents(logName, max, computer) {
        return new Promise(resolve => {
            const remote = computer && computer.trim() && computer.trim().toLowerCase() !== 'localhost';
            const comp = remote ? ` -ComputerName '${computer.trim().replace(/'/g, "''")}'` : '';
            const ps = `try { Get-WinEvent -LogName '${logName.replace(/'/g, "''")}' -MaxEvents ${max}${comp} -ErrorAction Stop | ` +
                `Select-Object @{n='time';e={$_.TimeCreated.ToString('o')}}, @{n='level';e={$_.LevelDisplayName}}, ` +
                `@{n='id';e={$_.Id}}, @{n='source';e={$_.ProviderName}}, @{n='message';e={$_.Message}} | ` +
                `ConvertTo-Json -Depth 2 -Compress } catch { Write-Error $_.Exception.Message }`;
            cp.execFile('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', ps],
                { maxBuffer: 40 * 1024 * 1024, windowsHide: true },
                (err, stdout, stderr) => {
                    if (err) { resolve({ error: (stderr || err.message || '').trim(), events: [] }); return; }
                    let data = [];
                    try { const j = JSON.parse(stdout || '[]'); data = Array.isArray(j) ? j : [j]; } catch (e) { }
                    resolve({ events: data });
                });
        });
    }
    context.subscriptions.push(vscode.commands.registerCommand('extension.openEventViewer', () => {
        if (eventViewerPanel) { eventViewerPanel.reveal(vscode.ViewColumn.Active, false); return; }
        eventViewerPanel = vscode.window.createWebviewPanel(
            'modscriptEventViewer', 'Windows Event Viewer', vscode.ViewColumn.Active,
            { enableScripts: true, retainContextWhenHidden: true }
        );
        eventViewerPanel.webview.html = getEventViewerHtml();
        eventViewerPanel.webview.onDidReceiveMessage(async msg => {
            if (msg.cmd === 'ready') {
                eventViewerPanel.webview.postMessage({ cmd: 'config', computer: getRepoServerHost(), hosts: getAllRepoHosts() });
            } else if (msg.cmd === 'fetch') {
                const log = msg.log || 'Application';
                const max = Math.min(msg.max || 300, 1000);
                const computer = (msg.computer || '').trim();
                let res = await fetchWinEvents(log, max, computer);
                // If the remote server can't be reached, fall back to the local machine automatically
                let note = null;
                if (res.error && computer && computer.toLowerCase() !== 'localhost') {
                    const local = await fetchWinEvents(log, max, 'localhost');
                    if (!local.error) {
                        note = `Could not reach '${computer}' (${res.error}). Showing this machine (localhost) instead.`;
                        res = local;
                        res.computer = 'localhost';
                    }
                }
                eventViewerPanel.webview.postMessage({ cmd: 'data', events: res.events, error: res.error || null, note, computer: res.computer || null });
            }
        }, undefined, context.subscriptions);
        eventViewerPanel.onDidDispose(() => { eventViewerPanel = null; }, null, context.subscriptions);
    }));

    // ─── Search everywhere across scripts (full-text, with usage preview) ──────
    // Returns matches with surrounding context so the webview can show a JetBrains-style preview.
    function searchScripts(query) {
        const q = (query || '').toLowerCase().trim();
        let contents = [];
        try { contents = ComposerController_1.getScriptContents(); } catch (e) { }
        const out = [];
        const MAX_TOTAL = 400, MAX_PER_FILE = 25, CTX = 12;
        if (!q) {
            // no query → list every script (name only) so the window is useful immediately
            for (const s of contents) {
                out.push({ id: s.id, name: s.name, solution: s.solution, type: s.type, line: 0, lineText: '', context: [], nameOnly: true });
                if (out.length >= MAX_TOTAL) break;
            }
            out.sort((a, b) => String(a.name).localeCompare(String(b.name)));
            return out;
        }
        for (const s of contents) {
            if (out.length >= MAX_TOTAL) break;
            const lines = String(s.text || '').split(/\r?\n/);
            let perFile = 0;
            const nameMatch = String(s.name || '').toLowerCase().indexOf(q) >= 0;
            if (nameMatch) { out.push({ id: s.id, name: s.name, solution: s.solution, type: s.type, line: 0, lineText: s.name, context: lines.slice(0, CTX + 1).map((t, i) => ({ n: i, text: t })), nameMatch: true }); perFile++; }
            for (let i = 0; i < lines.length; i++) {
                if (perFile >= MAX_PER_FILE || out.length >= MAX_TOTAL) break;
                if (lines[i].toLowerCase().indexOf(q) < 0) continue;
                const from = Math.max(0, i - CTX), to = Math.min(lines.length - 1, i + CTX);
                const context = [];
                for (let j = from; j <= to; j++) context.push({ n: j, text: lines[j], hit: j === i });
                out.push({ id: s.id, name: s.name, solution: s.solution, type: s.type, line: i, lineText: lines[i].trim(), context });
                perFile++;
            }
        }
        return out;
    }
    async function openScriptAtLine(id, line) {
        try {
            await vscode.commands.executeCommand('composerExplorer.openFile', id);
            for (let i = 0; i < 30; i++) {
                await new Promise(r => setTimeout(r, 50));
                const ed = vscode.window.activeTextEditor;
                if (ed && ed.document && ed.document.uri.scheme === ComposerController_1.MEM_FS_SCHEMA) {
                    const pos = new vscode.Position(Math.max(0, line || 0), 0);
                    ed.selection = new vscode.Selection(pos, pos);
                    ed.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.InCenter);
                    return;
                }
            }
        } catch (e) { vscode.window.showErrorMessage('Could not open script: ' + e.message); }
    }
    context.subscriptions.push(vscode.commands.registerCommand('extension.searchAllScripts', () => {
        if (scriptSearchPanel) { scriptSearchPanel.reveal(vscode.ViewColumn.Active, false); return; }
        scriptSearchPanel = vscode.window.createWebviewPanel(
            'modscriptScriptSearch', 'Search Everywhere', vscode.ViewColumn.Active,
            { enableScripts: true, retainContextWhenHidden: true }
        );
        scriptSearchPanel.webview.html = getScriptSearchHtml();
        scriptSearchPanel.webview.onDidReceiveMessage(async msg => {
            if (msg.cmd === 'ready' || msg.cmd === 'search') {
                scriptSearchPanel.webview.postMessage({ cmd: 'results', q: msg.q || '', matches: searchScripts(msg.q || '') });
            } else if (msg.cmd === 'open' && msg.id) {
                await openScriptAtLine(msg.id, msg.line || 0);  // window stays open (webview tab is retained)
            }
        }, undefined, context.subscriptions);
        scriptSearchPanel.onDidDispose(() => { scriptSearchPanel = null; }, null, context.subscriptions);
    }));

    // Show the welcome page automatically on first install/activation
    if (!context.globalState.get('modscript.welcomeShown')) {
        context.globalState.update('modscript.welcomeShown', true);
        // slight delay so it opens after the workbench has settled
        setTimeout(openWelcome, 800);
    }

    // ─── Checked-out / Favourites / Knowledge base views ──────────────────────
    const checkedOutProvider = new CheckedOutProvider();
    context.subscriptions.push(vscode.window.createTreeView('modscriptCheckedOut', { treeDataProvider: checkedOutProvider }));
    if (ComposerController_1.onCheckoutChanged) {
        context.subscriptions.push(ComposerController_1.onCheckoutChanged(() => checkedOutProvider.refresh()));
    }

    const favProvider = new FavouritesProvider(context);
    context.subscriptions.push(vscode.window.createTreeView('modscriptFavourites', { treeDataProvider: favProvider }));

    const kbProvider = new KnowledgeBaseProvider(context);
    context.subscriptions.push(vscode.window.createTreeView('modscriptKnowledgeBase', { treeDataProvider: kbProvider }));

    context.subscriptions.push(vscode.window.createTreeView('modscriptTools', { treeDataProvider: new ToolsProvider() }));

    // Helper: derive a favourite payload from a clicked tree item (works for both the
    // main Composer Explorer items and the Checked-out view items)
    function favFromItem(item) {
        if (!item) return null;
        if (item.scriptInfo) return { id: item.scriptInfo.id, name: item.scriptInfo.name, solution: item.scriptInfo.solution, type: item.scriptInfo.type };
        if (item.resourceScriptId) return { id: item.resourceScriptId, name: item.scriptName || item.label, solution: '', type: (item.resourceScriptId.indexOf('#script') >= 0 ? 'script' : 'javascript') };
        // Main explorer TreeItem: id like "Solution/PartID#script", label like "Name - C"
        if (item.id && typeof item.id === 'string' && item.id.indexOf('#') >= 0) {
            const label = typeof item.label === 'string' ? item.label : (item.label && item.label.label) || '';
            const name = label.replace(/\s*-\s*[CX]\s*$/, '').trim() || label;
            const solution = item.id.split('/')[0];
            return { id: item.id, name, solution, type: (item.id.indexOf('#script') >= 0 ? 'script' : 'javascript') };
        }
        return null;
    }

    context.subscriptions.push(vscode.commands.registerCommand('extension.addFavourite', async (item) => {
        const fav = favFromItem(item);
        if (!fav) { vscode.window.showWarningMessage('Select a script to add to favourites.'); return; }
        await favProvider.addFavourite(fav);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.removeFavourite', async (item) => {
        if (item && item.resourceScriptId) await favProvider.removeFavourite(item.resourceScriptId);
    }));

    // Knowledge base commands
    context.subscriptions.push(vscode.commands.registerCommand('extension.kbAdd', async () => {
        const name = await vscode.window.showInputBox({ prompt: 'Code Snippets: name for this snippet' });
        if (!name) return;
        const editor = vscode.window.activeTextEditor;
        let body = '';
        if (editor && !editor.selection.isEmpty) body = editor.document.getText(editor.selection);
        if (!body) {
            body = await vscode.window.showInputBox({ prompt: 'Snippet body (or select code in the editor first)' }) || '';
        }
        if (!body) return;
        await kbProvider.addEntry(name, body);
        vscode.window.showInformationMessage(`Saved "${name}" to Code Snippets.`);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.kbAddFromSelection', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.selection.isEmpty) { vscode.window.showWarningMessage('Select some code first.'); return; }
        const name = await vscode.window.showInputBox({ prompt: 'Code Snippets: name for this snippet' });
        if (!name) return;
        await kbProvider.addEntry(name, editor.document.getText(editor.selection));
        vscode.window.showInformationMessage(`Saved "${name}" to Code Snippets.`);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.kbDelete', async (item) => {
        const name = item && item.kbName;
        if (!name) return;
        const ok = await vscode.window.showWarningMessage(`Delete "${name}" from Code Snippets?`, 'Delete', 'Cancel');
        if (ok === 'Delete') await kbProvider.removeEntry(name);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.kbInsert', async (entry) => {
        const e = entry && entry.body ? entry : (entry && entry.kbBody ? { body: entry.kbBody } : null);
        if (!e) return;
        const editor = vscode.window.activeTextEditor;
        if (!editor) { vscode.window.showWarningMessage('Open a file to insert into.'); return; }
        await editor.insertSnippet(new vscode.SnippetString(e.body));
    }));
    context.subscriptions.push(vscode.commands.registerCommand("extension.composerExpandAll", async () => {
        ComposerController_1.expandCollapseAllSolutions(treeView, treeDataProvider);
    }));
    context.subscriptions.push(vscode.commands.registerCommand("extension.composerCollapseAll", async () => {
        await vscode.commands.executeCommand("workbench.actions.treeView.composerExplorer.collapseAll");
    }));

    function refreshCurrentFile(editor) {
        if (!editor) return;
        const curName = editor.document.uri.path.replace(/^\//, "");
        const file = treeDataProvider.openFiles[curName];
        if (!file) return;

        if (!isComposerFileCheckedOut(file.path)) {
            vscode.commands.executeCommand("workbench.action.files.setActiveEditorReadonlyInSession");
        } else {
            vscode.commands.executeCommand("workbench.action.files.setActiveEditorWriteableInSession");
        }
    }

    // Register an event listener for when the active text editor changes
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
        refreshCurrentFile(editor);
    }));
    // Register an event listener for when the focus changes
    context.subscriptions.push(vscode.window.onDidChangeWindowState(() => {
        let editor = vscode.window.activeTextEditor;
        refreshCurrentFile(editor);
    }));
    


    //Gives autocomplete on classes, free functions, variables, and custom functions.
    const provider1 = vscode.languages.registerCompletionItemProvider("modscript", {
        provideCompletionItems(document, position, token, context) {
            if (!vscode.workspace.getConfiguration('modscript').get('enableCompletion', true)) return;
            var _a;
            let compitems = [];
            for (var item of languageKeywords) {
                let commitCharacterCompletion = new vscode.CompletionItem(item, vscode.CompletionItemKind.Keyword);
                commitCharacterCompletion.commitCharacters = ['('];
                compitems.push(commitCharacterCompletion);
            }
            // Code snippets for common patterns
            const codeSnippets = [
                {
                    label: 'def',
                    detail: 'Function definition',
                    snippet: 'def ${1:functionName}(${2:params}) {\n\t$0\n}'
                },
                {
                    label: 'defclass',
                    detail: 'Class method definition',
                    snippet: 'def ${1:Class}::${2:method}(${3:params}) {\n\t$0\n}'
                },
                {
                    label: 'class',
                    detail: 'Class definition',
                    snippet: 'class ${1:ClassName} {\n\tvar ${2:field};\n\n\tdef ${1:ClassName}() {\n\t\t$0\n\t}\n}'
                },
                {
                    label: 'forloop',
                    detail: 'For loop over a collection',
                    snippet: 'for (${1:item} : ${2:collection}) {\n\t$0\n}'
                },
                {
                    label: 'foridx',
                    detail: 'For loop with index',
                    snippet: 'for (var ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t$0\n}'
                },
                {
                    label: 'ifel',
                    detail: 'If-else block',
                    snippet: 'if (${1:condition}) {\n\t$0\n} else {\n\t\n}'
                },
                {
                    label: 'trycatch',
                    detail: 'Try-catch block',
                    snippet: 'try {\n\t$0\n} catch (${1:e}) {\n\t\n}'
                },
                {
                    label: 'tryfinally',
                    detail: 'Try-catch-finally block',
                    snippet: 'try {\n\t$0\n} catch (${1:e}) {\n\t\n} finally {\n\t\n}'
                },
                {
                    label: 'whileloop',
                    detail: 'While loop',
                    snippet: 'while (${1:condition}) {\n\t$0\n}'
                },
                {
                    label: 'switch',
                    detail: 'Switch statement',
                    snippet: 'switch (${1:value}) {\n\tcase ${2:case}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}'
                },
                {
                    label: 'lambda',
                    detail: 'Lambda function',
                    snippet: 'fun (${1:param}) { $0 }'
                },
                // ── SBM API patterns ──
                {
                    label: 'getfield',
                    detail: 'SBM: read a field value as string',
                    snippet: '${1:record}.GetFieldValueString("${2:FieldName}")'
                },
                {
                    label: 'getfieldint',
                    detail: 'SBM: read a field value as int',
                    snippet: '${1:record}.GetFieldValueInt("${2:FieldName}")'
                },
                {
                    label: 'setfield',
                    detail: 'SBM: set a field value',
                    snippet: '${1:record}.SetFieldValue("${2:FieldName}", ${3:value});'
                },
                {
                    label: 'loginfo',
                    detail: 'SBM: write an info message to the log',
                    snippet: 'Ext.LogInfoMsg("${1:message}");'
                },
                {
                    label: 'logerror',
                    detail: 'SBM: write an error message to the log',
                    snippet: 'Ext.LogErrorMsg("${1:message}");'
                },
                {
                    label: 'logwarn',
                    detail: 'SBM: write a warning message to the log',
                    snippet: 'Ext.LogWarningMsg("${1:message}");'
                },
                {
                    label: 'seterror',
                    detail: 'SBM: set the shell error message (aborts action)',
                    snippet: 'Shell.SetLastErrorMessage("${1:message}");'
                },
                {
                    label: 'recordadd',
                    detail: 'SBM: add (commit) a record',
                    snippet: '${1:record}.Add();'
                }
            ];
            for (const s of codeSnippets) {
                const item = new vscode.CompletionItem(s.label, vscode.CompletionItemKind.Snippet);
                item.detail = s.detail;
                item.insertText = new vscode.SnippetString(s.snippet);
                item.sortText = '~' + s.label; // Sort snippets after other completions
                compitems.push(item);
            }
            for (const [clsName, cls] of Object.entries(classes)) {
                if (cls.className == "") {
                    for (const meth of cls.meathods) {
                        const meathodCompletion = new vscode.CompletionItem(meth.meathodName, vscode.CompletionItemKind.Function);
                        meathodCompletion.documentation = new vscode.MarkdownString(meth.meathodDescription);
                        // meathodCompletion.insertText = new vscode.SnippetString(`${meth.meathodName}($0)`);
                        meathodCompletion.commitCharacters = ["("];
                        compitems.push(meathodCompletion);
                    }
                }
                else {
                    if (!cls.exposed) {
                        continue;
                    }
                    ;
                    let commitCharacterCompletion = new vscode.CompletionItem(cls.className, vscode.CompletionItemKind.Class);
                    commitCharacterCompletion.commitCharacters = ['.'];
                    commitCharacterCompletion.documentation = new vscode.MarkdownString(cls.classDescription);
                    compitems.push(commitCharacterCompletion);
                }
            }
            for (var meth of globalFuncs[document.uri.toString()]) {
                const meathodCompletion = new vscode.CompletionItem(meth.meathodName, vscode.CompletionItemKind.Function);
                meathodCompletion.documentation = new vscode.MarkdownString(meth.meathodDescription);
                // meathodCompletion.insertText = new vscode.SnippetString(`${meth.meathodName}($0)`);
                meathodCompletion.commitCharacters = ["("];
                compitems.push(meathodCompletion);
            }
            let deduplicateVars = {};
            for (var v of globalVars[document.uri.toString()]) {
                let commitCharacterCompletion = new vscode.CompletionItem(v.variable, vscode.CompletionItemKind.Variable);
                commitCharacterCompletion.commitCharacters = ['.'];
                if (v.range.contains(position)) {
                    if (typeof v.type != "undefined") {
                        if (typeof classes[v.type] != "undefined") {
                            commitCharacterCompletion.documentation = new vscode.MarkdownString(`**${v.type}**\n${(_a = classes[v.type]) === null || _a === void 0 ? void 0 : _a.classDescription}`);
                        }
                        else {
                            commitCharacterCompletion.documentation = new vscode.MarkdownString(`Variable of type: **${v.type}**`);
                        }
                    }
                    else {
                        commitCharacterCompletion.documentation = new vscode.MarkdownString("Variable with unknown type.");
                    }
                    if (deduplicateVars[v.variable]) {
                        if (v.range.end.line - v.range.start.line < deduplicateVars[v.variable].range.end.line - deduplicateVars[v.variable].range.start.line) {
                            deduplicateVars[v.variable] = {
                                comp: commitCharacterCompletion,
                                range: v.range
                            };
                        }
                    }
                    else {
                        deduplicateVars[v.variable] = {
                            comp: commitCharacterCompletion,
                            range: v.range
                        };
                    }
                }
            }
            //@ts-ignore
            compitems = compitems.concat(Object.values(deduplicateVars).map(x => x.comp));
            return applyUsageRanking(compitems);
        }
    });
    // Gives autocomplete on function that are meathods of a class or variable of a class.
    const provider2 = vscode.languages.registerCompletionItemProvider('modscript', {
        provideCompletionItems(document, position) {
            if (!vscode.workspace.getConfiguration('modscript').get('enableCompletion', true)) return;
            const linePrefix = " " + document.lineAt(position).text.substr(0, position.character);
            let compitems = [];
            for (const [clsName, cls] of Object.entries(classes)) {
                if (cls.className == "") {
                    continue;
                } //Skip class that holds free functions
                if (!cls.exposed) {
                    continue;
                } //Skip Class that is not exposed
                if (linePrefix.match(new RegExp(`\\W${cls.className}[.][A-Za-z0-9]*$`, "g"))) {
                    for (const meth of cls.meathods) {
                        const meathodCompletion = new vscode.CompletionItem(meth.meathodName, vscode.CompletionItemKind.Method);
                        meathodCompletion.documentation = new vscode.MarkdownString(meth.meathodDescription);
                        // meathodCompletion.insertText = new vscode.SnippetString(`${meth.meathodName}($0)`);
                        // meathodCompletion.textEdit = new vscode.TextEdit(
                            // meathodCompletion.range,
                            // `${meth.meathodName}()`  // Text to insert
                        // );
                        meathodCompletion.commitCharacters = ["("];
                        compitems.push(meathodCompletion);
                    }
                    if (cls === null || cls === void 0 ? void 0 : cls.properties) {
                        for (const prop of cls.properties) {
                            const meathodCompletion = new vscode.CompletionItem(prop.propertyName, vscode.CompletionItemKind.Property);
                            meathodCompletion.documentation = new vscode.MarkdownString(prop.propertyDescription);
                            meathodCompletion.commitCharacters = ["."]
                            compitems.push(meathodCompletion);
                        }
                    }
                    break;
                }
            }
            let deduplicateVars = {};
            let arr = GetArrayOfFunctions(linePrefix);
            let tempClass = "";
            //console.log("GlobalClasses 135:")
            //console.log(globalClasses);
            for (let f of arr) {
                tempClass = lookupClassFunctionReturn(tempClass + f, globalVars[document.uri.toString()], globalFuncs[document.uri.toString()], globalClasses[document.uri.toString()], position);
            }
            var tempClasses = Object.assign({}, classes);
            //console.log("GlobalClasses 141:")
            //console.log(globalClasses);
            for (let cls of globalClasses[document.uri.toString()]) {
                tempClasses[cls.className] = cls;
            }
            //console.log(linePrefix, "  -  ", tempClass, "  -  [" + arr.toString() + "]");
            if (linePrefix.match(new RegExp(`\\Wthis[.][A-Za-z0-9]*$`, "g"))) {
                // console.log("GlobalClasses 148:")
                //console.logglobalClasses);
                for (let cls of globalClasses[document.uri.toString()]) {
                    if (cls.range.contains(position)) {
                        tempClass = cls.className;
                        break;
                    }
                }
            }
            if (!tempClass) {
                for (var v of globalVars[document.uri.toString()]) {
                    if (typeof v.type != "undefined") {
                        if (linePrefix.match(new RegExp(`\\W${v.variable}[.][A-Za-z0-9]*$`, "g"))) {
                            for (const [clsName, cls] of Object.entries(tempClasses)) {
                                if (cls.className == "") {
                                    continue;
                                } //Skip class that holds free functions
                                if (cls.className == v.type && v.range.contains(position)) {
                                    let arrayOfMeathodCompletions = [];
                                    for (const meth of cls.meathods) {
                                        const meathodCompletion = new vscode.CompletionItem(meth.meathodName, vscode.CompletionItemKind.Method);
                                        meathodCompletion.documentation = new vscode.MarkdownString(meth.meathodDescription);
                                        // meathodCompletion.insertText = new vscode.SnippetString(`${meth.meathodName}($0)`);
                                        // meathodCompletion.textEdit = new vscode.TextEdit(
                                            // meathodCompletion.range,
                                            // `${meth.meathodName}()`  // Text to insert
                                        // );
                                        meathodCompletion.commitCharacters = ["("];
                                        arrayOfMeathodCompletions.push(meathodCompletion);
                                    }
                                    if (cls === null || cls === void 0 ? void 0 : cls.properties) {
                                        for (const prop of cls.properties) {
                                            const meathodCompletion = new vscode.CompletionItem(prop.propertyName, vscode.CompletionItemKind.Property);
                                            meathodCompletion.documentation = new vscode.MarkdownString(prop.propertyDescription);
                                            meathodCompletion.commitCharacters = ["."]
                                            arrayOfMeathodCompletions.push(meathodCompletion);
                                        }
                                    }
                                    if (deduplicateVars[v.variable]) {
                                        if (v.range.end.line - v.range.start.line < deduplicateVars[v.variable].range.end.line - deduplicateVars[v.variable].range.start.line) {
                                            deduplicateVars[v.variable] = {
                                                comp: arrayOfMeathodCompletions,
                                                range: v.range
                                            };
                                        }
                                    }
                                    else {
                                        deduplicateVars[v.variable] = {
                                            comp: arrayOfMeathodCompletions,
                                            range: v.range
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                for (const [clsName, cls] of Object.entries(tempClasses)) {
                    if (cls.className == "") {
                        continue;
                    } //Skip class that holds free functions
                    if (cls.className == tempClass) {
                        let arrayOfMeathodCompletions = [];
                        for (const meth of cls.meathods) {
                            const meathodCompletion = new vscode.CompletionItem(meth.meathodName, vscode.CompletionItemKind.Method);
                            meathodCompletion.documentation = new vscode.MarkdownString(meth.meathodDescription);
                            // meathodCompletion.insertText = new vscode.SnippetString(`${meth.meathodName}($0)`);
                            // meathodCompletion.textEdit = new vscode.TextEdit(
                                // meathodCompletion.range,
                                // `${meth.meathodName}()`  // Text to insert
                            // );
                            meathodCompletion.commitCharacters = ["("];
                            compitems.push(meathodCompletion);
                        }
                        if (cls === null || cls === void 0 ? void 0 : cls.properties) {
                            for (const prop of cls.properties) {
                                const meathodCompletion = new vscode.CompletionItem(prop.propertyName, vscode.CompletionItemKind.Property);
                                meathodCompletion.documentation = new vscode.MarkdownString(prop.propertyDescription);
                                meathodCompletion.commitCharacters = ["."]
                                compitems.push(meathodCompletion);
                            }
                        }
                    }
                }
            }
            //@ts-ignore
            compitems = compitems.concat(Object.values(deduplicateVars).map(x => x.comp).flat());
            var result = compitems.reduce((unique, o) => {
                if (!unique.some(obj => obj.label === o.label)) {
                    unique.push(o);
                }
                return unique;
            }, []);
            //return compitems || undefined;
            return applyUsageRanking(result) || undefined;
        }
    }, '.' // triggered whenever a '.' is being typed
    );
    //Gives function signiture completion on function paramaters and gives info about the function. 
    const providor3 = vscode.languages.registerSignatureHelpProvider("modscript", {
        provideSignatureHelp(document, position, token, context) {
            if (!vscode.workspace.getConfiguration('modscript').get('enableSignatureHelp', true)) return;
            const SignatureHelp = new vscode.SignatureHelp();
            let activeSignatureHelp = context.activeSignatureHelp;
            let activeSignatureIndex = activeSignatureHelp ? activeSignatureHelp.activeSignature : 0;
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            // var temp = "";
            // var text = [];
            // for(let t of linePrefix){
            // 	if(t == "("){text.push(temp + "(");temp = "";
            // 	}else if(t == ")"){temp = "";text.pop();
            // 	}else{temp += t;}
            // }
            // linePrefix = text.pop();
            let arr = GetArrayOfFunctions(linePrefix + ")");
            let tempClass = "";
            // console.log("GlobalClasses 253:")
            //console.logglobalClasses);
            for (let i = 0; i < arr.length - 1; i++) {
                tempClass = lookupClassFunctionReturn(tempClass + arr[i], globalVars[document.uri.toString()], globalFuncs[document.uri.toString()], globalClasses[document.uri.toString()], position);
            }
            var m = linePrefix.match(/\(.*$/g);
            linePrefix = tempClass + arr.pop() + (m == null ? "" : m[0]);
            var regex = /((?<class>[A-Za-z0-9]+)[.])?(?<meathod>[A-Za-z0-9]+)\([A-Za-z0-9,.\"\\()]*?/gm;
            var matches = regex.exec(linePrefix);
            var tempClasses = Object.assign({}, classes);
            //console.log"GlobalClasses 262:")
            //console.logglobalClasses);
            for (let cls of globalClasses[document.uri.toString()]) {
                tempClasses[cls.className] = cls;
            }
            if (matches) {
                var classTemp = [];
                if (matches.groups.class && tempClasses[matches.groups.class]) {
                    classTemp.push(tempClasses[matches.groups.class]);
                }
                else {
                    let varClassTemp;
                    let rangeLength = document.lineCount + 100;
                    for (var v of globalVars[document.uri.toString()]) {
                        if (typeof v.type != "undefined") {
                            if (matches.groups.class == v.variable && v.range.contains(position)) {
                                //classTemp.push(tempClasses[v.type]);
                                if (v.range.end.line - v.range.start.line < rangeLength) {
                                    varClassTemp = tempClasses[v.type];
                                    rangeLength = v.range.end.line - v.range.start.line;
                                }
                            }
                        }
                    }
                    if (varClassTemp) {
                        classTemp.push(varClassTemp);
                    }
                    if (classTemp.length == 0) {
                        classTemp = freeClasses;
                        let temp = {
                            className: "",
                            exposed: true,
                            inheritsFrom: "",
                            classDescription: "",
                            meathods: globalFuncs[document.uri.toString()],
                            properties: []
                        };
                        classTemp = classTemp.concat(temp);
                    }
                }
                for (let i = 0; i < classTemp.length; i++) {
                    if (classTemp[i]) {
                        for (const meth of classTemp[i].meathods) {
                            if (matches.groups.meathod == meth.meathodName) {
                                let meathodParmsString = ``;
                                let meathodParmsStringHeader = ``;
                                for (let param of meth.meathodParms) {
                                    let type = param.type;
                                    if (typeof type != "string") {
                                        type = type.join(",");
                                    }
                                    let name = param.name;
                                    let parmString = `@param`;
                                    if (param.optional) {
                                        name = `[${name}]`;
                                        parmString = `@optional`;
                                    }
                                    meathodParmsString += `${parmString}\`${name}\` **&lt;${type}&gt;** ${param.description}\n\n`;
                                    meathodParmsStringHeader += `${name}<${type}>, `;
                                }
                                meathodParmsStringHeader = meathodParmsStringHeader.slice(0, meathodParmsStringHeader.length - 2);
                                const meathodReturnString = `@return **&lt;${meth.meathodReturn}&gt;**\n${meth.meathodReturnDescription}`;
                                const meathodSignatureString = `${meth.meathodName}(${meathodParmsStringHeader}):<${meth.meathodReturn}>`;
                                const SignatureInfo = new vscode.SignatureInformation(meathodSignatureString, new vscode.MarkdownString(`${meth.meathodDescription}\n\n${meathodParmsString}\n\n${meathodReturnString}`));
                                SignatureHelp.signatures.push(SignatureInfo);
                            }
                        }
                    }
                }
                SignatureHelp.activeSignature = activeSignatureIndex;
            }
            return SignatureHelp;
        }
    }, "(", ",");
    //Hover Provider, currently only gives info on variables. 
    // const providor4 = vscode.languages.registerHoverProvider('modscript', {
    //     provideHover(document, position, token) {
    //         try {
    //             let word = document.getWordRangeAtPosition(position);
    //                 let wordLookup = document.lineAt(position).text.substr(word.start.character, word.end.character);
    //             //console.log(wordLookup);
    //             let hoverText = null;
    //             let rangeLength = document.lineCount + 100;
    //             for (var v of globalVars[document.uri.toString()]) {
    //                 if (v.range.contains(position)) {
    //                     if (typeof v.type != "undefined") {
    //                         if (wordLookup.match(new RegExp(`^${v.variable}(\\.|\\b)+`, "g"))) {
    //                             // for(const [clsName, cls] of Object.entries(classes)){
    //                             // 	if(cls.className == ""){continue}//Skip class that holds free functions
    //                             // 	if(cls.className == v.type){
    //                             // 		//hoverText = new vscode.MarkdownString(`**${v.type}**\n${cls?.classDescription}`);
    //                             // 		if(v.range.end.line - v.range.start.line < rangeLength){
    //                             // 			hoverText = new vscode.MarkdownString(`Variable of type: **${v.type}**`);
    //                             // 			rangeLength = v.range.end.line - v.range.start.line;
    //                             // 		}
    //                             // 		//break main;
    //                             // 	}
    //                             // }
    //                             if (v.range.end.line - v.range.start.line < rangeLength) {
    //                                 hoverText = new vscode.MarkdownString(`Variable of type: **${v.type}**`);
    //                                 rangeLength = v.range.end.line - v.range.start.line;
    //                             }
    //                             //break main;
    //                         }
    //                     }
    //                     else {
    //                         if (wordLookup.match(new RegExp(`${v.variable}(\\.|\\b)+`, "g"))) {
    //                             if (v.range.end.line - v.range.start.line < rangeLength) {
    //                                 hoverText = new vscode.MarkdownString(`Variable of Unknown Type`);
    //                                 rangeLength = v.range.end.line - v.range.start.line;
    //                             }
    //                             //break main;
    //                         }
    //                     }
    //                 }
    //             }
    //             if (hoverText) {
    //                 return new vscode.Hover(hoverText);
    //             }
    //             else {
    //                 return undefined;
    //             }
    //         } catch (error) {
    //             console.log("Error: ", error);
    //             return undefined;
    //         }
    //     }
    // });
    const providor4 = vscode.languages.registerHoverProvider('modscript', {
        provideHover(document, position, token) {
            if (!vscode.workspace.getConfiguration('modscript').get('enableHover', true)) return;
            try {
                let wordRange = document.getWordRangeAtPosition(position);
                let wordLookup = document.getText(wordRange);
                let hoverText = null;
                let rangeLength = document.lineCount + 100;
    
                // Check for variable hover information
                for (var v of globalVars[document.uri.toString()]) {
                    if (v.range.contains(position)) {
                        if (typeof v.type != "undefined") {
                            if (wordLookup.match(new RegExp(`^${v.variable}(\\.|\\b)+`, "g"))) {
                                if (v.range.end.line - v.range.start.line < rangeLength) {
                                    hoverText = new vscode.MarkdownString(`Variable of type: **${v.type}**`);
                                    rangeLength = v.range.end.line - v.range.start.line;
                                }
                            }
                        } else {
                            if (wordLookup.match(new RegExp(`${v.variable}(\\.|\\b)+`, "g"))) {
                                if (v.range.end.line - v.range.start.line < rangeLength) {
                                    hoverText = new vscode.MarkdownString(`Variable of Unknown Type`);
                                    rangeLength = v.range.end.line - v.range.start.line;
                                }
                            }
                        }
                    }
                }
    
                // Check for function hover information
                let linePrefix = document.lineAt(position).text.substr(0, position.character);
                let arr = GetArrayOfFunctions(linePrefix + ")");
                let tempClass = "";
                for (let i = 0; i < arr.length - 1; i++) {
                    tempClass = lookupClassFunctionReturn(tempClass + arr[i], globalVars[document.uri.toString()], globalFuncs[document.uri.toString()], globalClasses[document.uri.toString()], position);
                }
                var m = linePrefix.match(/\(.*$/g);
                linePrefix = tempClass + arr.pop() + (m == null ? "" : m[0]);
                var regex = /((?<class>[A-Za-z0-9]+)[.])?(?<meathod>[A-Za-z0-9]+)\([A-Za-z0-9,.\"\\()]*?/gm;
                var matches = regex.exec(linePrefix);
                var tempClasses = Object.assign({}, classes);
                for (let cls of globalClasses[document.uri.toString()]) {
                    tempClasses[cls.className] = cls;
                }
    
                if (matches) {
                    var classTemp = [];
                    if (matches.groups.class && tempClasses[matches.groups.class]) {
                        classTemp.push(tempClasses[matches.groups.class]);
                    } else {
                        let varClassTemp;
                        let rangeLength = document.lineCount + 100;
                        for (var v of globalVars[document.uri.toString()]) {
                            if (typeof v.type != "undefined") {
                                if (matches.groups.class == v.variable && v.range.contains(position)) {
                                    if (v.range.end.line - v.range.start.line < rangeLength) {
                                        varClassTemp = tempClasses[v.type];
                                        rangeLength = v.range.end.line - v.range.start.line;
                                    }
                                }
                            }
                        }
                        if (varClassTemp) {
                            classTemp.push(varClassTemp);
                        }
                        if (classTemp.length == 0) {
                            classTemp = freeClasses;
                            let temp = {
                                className: "",
                                exposed: true,
                                inheritsFrom: "",
                                classDescription: "",
                                meathods: globalFuncs[document.uri.toString()],
                            };
                            classTemp.push(temp);
                        }
                    }
    
                    for (let i = 0; i < classTemp.length; i++) {
                        if (classTemp[i]) {
                            for (const meth of classTemp[i].meathods) {
                                if (matches.groups.meathod == meth.meathodName) {
                                    let meathodParmsString = ``;
                                    let meathodParmsStringHeader = ``;
                                    for (let param of meth.meathodParms) {
                                        let type = param.type;
                                        if (typeof type != "string") {
                                            type = type.join(",");
                                        }
                                        let name = param.name;
                                        let parmString = `@param`;
                                        if (param.optional) {
                                            name = `[${name}]`;
                                            parmString = `@optional`;
                                        }
                                        meathodParmsString += `${parmString}\`${name}\` **&lt;${type}&gt;** ${param.description}\n\n`;
                                        meathodParmsStringHeader += `${name}<${type}>, `;
                                    }
                                    meathodParmsStringHeader = meathodParmsStringHeader.slice(0, meathodParmsStringHeader.length - 2);
                                    const meathodReturnString = `@return **&lt;${meth.meathodReturn}&gt;**\n${meth.meathodReturnDescription}`;
                                    const meathodSignatureString = `${meth.meathodName}(${meathodParmsStringHeader}):<${meth.meathodReturn}>`;
                                    const hoverMarkdown = new vscode.MarkdownString(`${meth.meathodDescription}\n\n${meathodParmsString}\n\n${meathodReturnString}`);
                                    hoverText = hoverMarkdown;
                                }
                            }
                        }
                    }
                }
    
                if (hoverText) {
                    return new vscode.Hover(hoverText);
                } else {
                    return undefined;
                }
            } catch (error) {
                console.error(error);
                return undefined;
            }
        }
    });
    
    //Snippet completion for /** Function Documentation comments
    const provider6 = vscode.languages.registerCompletionItemProvider("modscript", {
        provideCompletionItems(document, position, token, context) {
            if (!vscode.workspace.getConfiguration('modscript').get('enableCompletion', true)) return;
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.match(/^\s*\/\*\*/g)) {
                return;
            }
            const compitems = [];
            let variableTypesString = "Variant,";
            for (const [clsName, cls] of Object.entries(classes)) {
                if (cls.className != "" && cls.className != "Variant") {
                    variableTypesString += cls.className + ",";
                }
            }
            variableTypesString = variableTypesString.slice(0, -1);
            const uri = document.uri.toString();
            // Find the function being documented and whether it is a class method
            let meth = (globalFuncs[uri] || []).find(m => m.range && m.range.contains(position));
            let isClassMethod = !!(meth && meth.ownerClass);
            if (!meth) {
                for (const c of (globalClasses[uri] || [])) {
                    const mm = (c.meathods || []).find(m => m.range && m.range.contains(position));
                    if (mm) { meth = mm; isClassMethod = true; break; }
                }
            }
            if (!isClassMethod) {
                for (const c of (globalClasses[uri] || [])) { if (c.range && c.range.contains(position)) { isClassMethod = true; break; } }
            }
            const item = new vscode.CompletionItem("JSDOC Documentation...", vscode.CompletionItemKind.Snippet);
            if (meth && isClassMethod) {
                // Class methods: full @param / @returns scaffold
                let tempString = "\n * ${1:" + meth.meathodName + " Description}\n";
                let index = 2;
                for (let param of (meth.meathodParms || [])) {
                    if (param.type != "Variant") {
                        tempString += " * @param {${" + index++ + "|" + param.type + "," + variableTypesString + "|}} ${" + index++ + ":" + param.name + " Paramater Description}\n";
                    } else {
                        tempString += " * @param {${" + index++ + "|" + variableTypesString + "|}} ${" + index++ + ":" + param.name + " Paramater Description}\n";
                    }
                }
                if (meth.meathodReturn !== "Void") {
                    tempString += " * @returns {${" + index++ + "|" + variableTypesString + "|}} ${" + index++ + ":Return Description}\n */";
                } else {
                    tempString += " */";
                }
                item.insertText = new vscode.SnippetString(tempString);
            } else {
                // Free functions (or anywhere else): description only, no params/returns
                item.insertText = new vscode.SnippetString("\n * ${1:Description}\n */");
            }
            compitems.push(item);
            return compitems;
        }
    }, '*');
    // Go to definition provider for variables and functions (Ctrl + left click)
    const provider7 = vscode.languages.registerDefinitionProvider('modscript', {
        provideDefinition(document, position, token) {
            const wordRange = document.getWordRangeAtPosition(position);
            const functionName = document.getText(wordRange);

            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            // console.log(linePrefix);
            // Check if the word is not an include
            if (linePrefix.match(/^include\(\s*["']?([^"']*)\s*/)) {
                return null;
            }
            // Check if the word is a method called on instance of a class
            const instanceMatch = linePrefix.match(/(\w+)\.\s*(?:\w+)?$/);
            let instanceType = null;

            if (instanceMatch) {
                const instanceName = instanceMatch[1];
                for (const v of globalVars[document.uri.toString()]) {
                    if (v.variable === instanceName && v.range.contains(position)) {
                        instanceType = v.type;
                        break;
                    }
                }
                // console.log(instanceName, " : ", instanceType)
            }

            // Find the function declaration
            const functionLocation = findFunctionDeclaration(functionName, instanceType, document.uri);
    
            if (functionLocation) {
                return new vscode.Location(functionLocation.uri, functionLocation.range);
            }
    
            return null;
        }
    });
    function findFunctionDeclaration(functionName, instanceType, currentUri) {
        // console.log(functionName);
        // Iterate through all documents in the workspace
        const documents = vscode.workspace.textDocuments;
        // console.log(documents);
    
        for (const doc of documents) {
            // Search for the function declaration in the document
            const regex = new RegExp(`\\bdef\\s+(\\w+::)?${functionName}\\s*\\(`, 'g');
            for (let i = 0; i < doc.lineCount; i++) {
                const line = doc.lineAt(i);
                const match = regex.exec(line.text);
                if (match) {
                    // Check if the function is a method of a class, if so, skip if the instance type does not match
                    if (match[1] && match[1].slice(0, -2) !== instanceType) {
                        continue;
                    }
                    return {
                        uri: doc.uri,
                        range: new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.text.length))
                    };
                }
            }
        }
    
        return null;
    }
    // Go to definition provider for include files (Ctrl + left click)
    const provider8 = vscode.languages.registerDefinitionProvider('modscript', {
        provideDefinition(document, position, token) {
            const line = document.lineAt(position);
            const includeMatch = line.text.match(/^include\(\s*["']([^"']+)["']\s*\)/);

            if (includeMatch) {
                const includeName = includeMatch[1];
                const uri = findFileInOpenFiles(includeName);
                if (uri) {
                    return new vscode.Location(uri, new vscode.Position(0, 0));
                }
            }

            return null;
        }
    });
    function findFileInOpenFiles(fileName) {
        const files = Object.values(treeDataProvider.openFiles);
        let ums = { found: false, uri: null };
        for (const file of files) {
            if (file.name.endsWith(`/${fileName}.tscm`)) {
                if (file.name.split("/")[0] === "UpdateModScript") {
                    ums = { found: true, uri: file.uri };
                    continue;
                }
                return file.uri;
            }
        }
        if (ums.found) {
            return ums.uri;
        }
    
        return null;
    }
    context.subscriptions.push(provider1, provider2, providor3, providor4, provider6, provider7, provider8);

    // Create diagnostic collection for error/warning markers (shown as "Composer problems")
    diagnosticCollection = vscode.languages.createDiagnosticCollection('Composer problems');
    context.subscriptions.push(diagnosticCollection);

    // Document Symbols provider — enables Ctrl+Shift+O outline and breadcrumbs
    const providerDocSymbols = vscode.languages.registerDocumentSymbolProvider('modscript', {
        async provideDocumentSymbols(document, token) {
            // If this document hasn't been parsed yet, parse it now
            if (!globalFuncs[document.uri.toString()]) {
                await ParseDocument(document);
            }
            const funcs = globalFuncs[document.uri.toString()] || [];
            const clses = globalClasses[document.uri.toString()] || [];
            const symbols = [];

            function nameSelRange(declRange, name) {
                if (!declRange) return null;
                try {
                    const lineText = document.lineAt(declRange.start.line).text;
                    const idx = lineText.indexOf(name);
                    if (idx >= 0) {
                        return new vscode.Range(
                            new vscode.Position(declRange.start.line, idx),
                            new vscode.Position(declRange.start.line, idx + name.length)
                        );
                    }
                } catch (e) {}
                return declRange;
            }

            for (const func of funcs) {
                try {
                    const range = func.declarationRange || func.range;
                    if (!range) continue;
                    const sel = nameSelRange(func.declarationRange, func.meathodName) || range;
                    const desc = (func.meathodDescription && func.meathodDescription !== 'User Defined Function')
                        ? func.meathodDescription.trim().split('\n')[0]
                        : '';
                    symbols.push(new vscode.DocumentSymbol(
                        func.meathodName,
                        desc,
                        vscode.SymbolKind.Function,
                        range,
                        sel
                    ));
                } catch (e) { /* skip malformed entry */ }
            }

            for (const c of clses) {
                try {
                    if (!c.range) continue;
                    const selRange = new vscode.Range(c.range.start, c.range.start);
                    const classSymbol = new vscode.DocumentSymbol(
                        c.className,
                        c.classDescription || '',
                        vscode.SymbolKind.Class,
                        c.range,
                        selRange
                    );
                    for (const m of (c.meathods || [])) {
                        try {
                            const mRange = m.declarationRange || m.range;
                            if (!mRange) continue;
                            const mSel = nameSelRange(m.declarationRange, m.meathodName) || mRange;
                            classSymbol.children.push(new vscode.DocumentSymbol(
                                m.meathodName,
                                '',
                                vscode.SymbolKind.Method,
                                mRange,
                                mSel
                            ));
                        } catch (e) {}
                    }
                    symbols.push(classSymbol);
                } catch (e) { /* skip */ }
            }

            return symbols;
        }
    });
    context.subscriptions.push(providerDocSymbols);

    // ─── References (Shift+F12) and Rename (F2) ───────────────────────────────
    // Whole-word matches within the current document (skips comments and strings).
    function wholeWordRanges(document, word) {
        const ranges = [];
        const re = new RegExp('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g');
        for (let i = 0; i < document.lineCount; i++) {
            let text = document.lineAt(i).text.split('//')[0];
            text = text.replace(/"[^"]*"/g, m => ' '.repeat(m.length)).replace(/'[^']*'/g, m => ' '.repeat(m.length));
            let m;
            while ((m = re.exec(text))) {
                ranges.push(new vscode.Range(i, m.index, i, m.index + word.length));
            }
        }
        return ranges;
    }
    const providerReferences = vscode.languages.registerReferenceProvider('modscript', {
        provideReferences(document, position) {
            const wr = document.getWordRangeAtPosition(position);
            if (!wr) return [];
            const word = document.getText(wr);
            return wholeWordRanges(document, word).map(r => new vscode.Location(document.uri, r));
        }
    });
    const providerRename = vscode.languages.registerRenameProvider('modscript', {
        prepareRename(document, position) {
            const wr = document.getWordRangeAtPosition(position);
            if (!wr) throw new Error('You cannot rename this element.');
            return wr;
        },
        provideRenameEdits(document, position, newName) {
            const wr = document.getWordRangeAtPosition(position);
            if (!wr) return;
            const word = document.getText(wr);
            const edit = new vscode.WorkspaceEdit();
            for (const r of wholeWordRanges(document, word)) edit.replace(document.uri, r, newName);
            return edit;
        }
    });
    context.subscriptions.push(providerReferences, providerRename);

    // ─── Auto-import / include helper ─────────────────────────────────────────
    // If the symbol under the cursor is defined in another parsed script, offer to add include("...")
    function scriptBaseName(uriStr) {
        try {
            let p = decodeURIComponent(uriStr).split(/[\\/]/).pop() || '';
            return p.replace(/\.(tscm|js|vb)$/i, '');
        } catch (e) { return ''; }
    }
    const providerInclude = vscode.languages.registerCodeActionsProvider('modscript', {
        provideCodeActions(document, range, context, token) {
            const actions = [];
            const wr = document.getWordRangeAtPosition(range.start);
            if (!wr) return actions;
            const word = document.getText(wr);
            const curBase = scriptBaseName(document.uri.toString());
            let foundName = null;
            // Primary: repo-wide index (knows every script, even un-opened ones)
            try {
                const idx = ComposerController_1.getScriptIndex();
                const s = idx && idx.symbolToScript[word.toLowerCase()];
                if (s && s !== curBase) foundName = s;
            } catch (e) { }
            // Fallback: already-parsed files
            if (!foundName) {
                const curUri = document.uri.toString();
                for (const [uri, funcs] of Object.entries(globalFuncs)) {
                    if (uri === curUri) continue;
                    if ((funcs || []).some(f => f.meathodName === word)) { foundName = scriptBaseName(uri); break; }
                }
                if (!foundName) for (const [uri, clss] of Object.entries(globalClasses)) {
                    if (uri === curUri) continue;
                    if ((clss || []).some(c => c.className === word)) { foundName = scriptBaseName(uri); break; }
                }
            }
            if (foundName) {
                const full = document.getText();
                const already = new RegExp('include\\(\\s*["\']' + foundName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\']').test(full);
                if (!already) {
                    const fix = new vscode.CodeAction(`Add include("${foundName}")`, vscode.CodeActionKind.QuickFix);
                    fix.edit = new vscode.WorkspaceEdit();
                    fix.edit.insert(document.uri, new vscode.Position(0, 0), `include("${foundName}");\n`);
                    fix.isPreferred = true;
                    actions.push(fix);
                }
            }
            return actions;
        }
    }, { providedCodeActionKinds: [vscode.CodeActionKind.QuickFix] });
    context.subscriptions.push(providerInclude);

    // ─── Completion from the repo-wide script index, ranked by real usage ─────
    // Classes/functions that actually appear in the project's scripts are offered first
    // (sorted by how often they're used), ahead of system API entries.
    const providerRepoSymbols = vscode.languages.registerCompletionItemProvider('modscript', {
        provideCompletionItems(document, position) {
            if (!vscode.workspace.getConfiguration('modscript').get('enableCompletion', true)) return;
            let idx;
            try { idx = ComposerController_1.getScriptIndex(); } catch (e) { return; }
            if (!idx || !idx.symbols || !idx.symbols.length) return;
            const curBase = scriptBaseName(document.uri.toString());
            const full = document.getText();
            // Which scripts are already included?
            const includedNames = new Set();
            let im; const incRe = /include\s*\(\s*["']([^"']+)["']/g;
            while ((im = incRe.exec(full))) includedNames.add(im[1].toLowerCase());
            const items = [];
            for (const s of idx.symbols) {
                const kind = s.kind === 'class' ? vscode.CompletionItemKind.Class : vscode.CompletionItemKind.Function;
                const it = new vscode.CompletionItem(s.name, kind);
                it.detail = `${s.kind} · ${s.script} · used ${s.freq}×`;
                it.documentation = new vscode.MarkdownString(`Defined in **${s.script}** — used ${s.freq} time(s) across scripts.`);
                const rank = String(Math.max(0, 100000 - s.freq)).padStart(6, '0');
                it.sortText = '0_' + rank + '_' + s.name;
                if (s.kind === 'function') it.commitCharacters = ['('];
                // Auto-import: selecting a symbol from another script inserts its include() at the top
                if (s.script && s.script !== curBase && !includedNames.has(s.script.toLowerCase())) {
                    it.additionalTextEdits = [vscode.TextEdit.insert(new vscode.Position(0, 0), `include("${s.script}");\n`)];
                    it.detail += ' · adds include';
                }
                items.push(it);
            }
            return items;
        }
    });
    context.subscriptions.push(providerRepoSymbols);

    // ─── Modscript Outline panel ──────────────────────────────────────────────
    outlineProvider = new ModscriptOutlineProvider();
    const outlineTreeView = vscode.window.createTreeView('modscriptOutline', {
        treeDataProvider: outlineProvider,
        showCollapseAll: true
    });
    context.subscriptions.push(outlineTreeView);

    // Set initial filter context (controls which toolbar buttons are shown)
    vscode.commands.executeCommand('setContext', 'modscript.outlineShowFunctions', true);
    vscode.commands.executeCommand('setContext', 'modscript.outlineShowClasses', true);
    vscode.commands.executeCommand('setContext', 'modscript.outlineShowMethods', true);
    vscode.commands.executeCommand('setContext', 'modscript.outlineShowGlobals', true);
    vscode.commands.executeCommand('setContext', 'modscript.outlineShowInstances', true);

    // Navigation via selection — same pattern as webview onDidReceiveMessage.
    // onDidChangeSelection gives us the real OutlineItem object (no JSON serialization),
    // so item.data.declarationRange is a real vscode.Range with proper .start.line
    context.subscriptions.push(outlineTreeView.onDidChangeSelection(async e => {
        if (!e.selection || e.selection.length === 0) return;
        const item = e.selection[0];
        if (!item) return;
        if (item.type === 'category') return;  // category headers just expand/collapse, no navigation
        const data = item.data;
        if (!data || (!data.declarationRange && !data.range)) return;  // placeholder / no position
        // docUri = the file where this symbol is actually defined (may differ from active file via include())
        const targetUri = item.docUri
            || (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.uri.toString());
        if (!targetUri) return;
        let line = 0;
        if (data.declarationRange) {
            line = data.declarationRange.start.line;
        } else if (data.range) {
            line = data.range.start.line;
        }
        const pos = new vscode.Position(line, 0);
        const vsRange = new vscode.Range(pos, pos);
        try {
            const doc = await vscode.workspace.openTextDocument(vscode.Uri.parse(targetUri));
            // Open as a new permanent tab in the active group (preview:false prevents
            // replacing the current script's tab; no split)
            const editor = await vscode.window.showTextDocument(doc, {
                viewColumn: vscode.ViewColumn.Active,
                preserveFocus: false,
                preview: false
            });
            editor.selection = new vscode.Selection(pos, pos);
            editor.revealRange(vsRange, vscode.TextEditorRevealType.InCenter);
        } catch (err) {
            console.error('[outlineNav] failed for', targetUri, 'line', line, err);
            vscode.window.showErrorMessage('Modscript: could not open definition: ' + err.message);
        }
    }));

    // Keep command registered (referenced in package.json menus) but navigation is handled above
    context.subscriptions.push(vscode.commands.registerCommand('extension.outlineGoTo', () => {}));

    // Toggle filters — icon switches between "symbol" and "eye-closed" via setContext
    context.subscriptions.push(vscode.commands.registerCommand('extension.outlineFuncHide', () => {
        outlineProvider.showFunctions = false;
        vscode.commands.executeCommand('setContext', 'modscript.outlineShowFunctions', false);
        outlineProvider.refresh();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.outlineFuncShow', () => {
        outlineProvider.showFunctions = true;
        vscode.commands.executeCommand('setContext', 'modscript.outlineShowFunctions', true);
        outlineProvider.refresh();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.outlineClassHide', () => {
        outlineProvider.showClasses = false;
        vscode.commands.executeCommand('setContext', 'modscript.outlineShowClasses', false);
        outlineProvider.refresh();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.outlineClassShow', () => {
        outlineProvider.showClasses = true;
        vscode.commands.executeCommand('setContext', 'modscript.outlineShowClasses', true);
        outlineProvider.refresh();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.outlineMethodHide', () => {
        outlineProvider.showMethods = false;
        vscode.commands.executeCommand('setContext', 'modscript.outlineShowMethods', false);
        outlineProvider.refresh();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.outlineMethodShow', () => {
        outlineProvider.showMethods = true;
        vscode.commands.executeCommand('setContext', 'modscript.outlineShowMethods', true);
        outlineProvider.refresh();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.outlineGlobalHide', () => {
        outlineProvider.showGlobals = false;
        vscode.commands.executeCommand('setContext', 'modscript.outlineShowGlobals', false);
        outlineProvider.refresh();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.outlineGlobalShow', () => {
        outlineProvider.showGlobals = true;
        vscode.commands.executeCommand('setContext', 'modscript.outlineShowGlobals', true);
        outlineProvider.refresh();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.outlineInstanceHide', () => {
        outlineProvider.showInstances = false;
        vscode.commands.executeCommand('setContext', 'modscript.outlineShowInstances', false);
        outlineProvider.refresh();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.outlineInstanceShow', () => {
        outlineProvider.showInstances = true;
        vscode.commands.executeCommand('setContext', 'modscript.outlineShowInstances', true);
        outlineProvider.refresh();
    }));

    // Refresh outline when the active editor changes
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(() => {
        if (outlineProvider) outlineProvider.refresh();
    }));

    // ─── Class Reference Browser ──────────────────────────────────────────────
    function sendBrowserData() {
        if (!classBrowserPanel) return;
        try {
            const items = buildClassBrowserData();
            classBrowserPanel.webview.postMessage({ cmd: 'setData', items });
        } catch (e) {
            console.error('[ModscriptBrowser] buildClassBrowserData failed:', e);
        }
    }

    context.subscriptions.push(vscode.commands.registerCommand('extension.openClassBrowser', () => {
        if (classBrowserPanel) {
            classBrowserPanel.reveal(vscode.ViewColumn.Beside, false);
            sendBrowserData();
            return;
        }
        classBrowserPanel = vscode.window.createWebviewPanel(
            'modscriptClassBrowser',
            'Modscript Reference',
            { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
            { enableScripts: true, retainContextWhenHidden: true }
        );
        classBrowserPanel.webview.html = getClassBrowserHtml();
        classBrowserPanel.webview.onDidReceiveMessage(async msg => {
            if (msg.cmd === 'ready') {
                sendBrowserData();
            } else if (msg.cmd === 'navigate' && msg.uri && msg.line >= 0) {
                try {
                    const doc = await vscode.workspace.openTextDocument(vscode.Uri.parse(msg.uri));
                    const editor = await vscode.window.showTextDocument(doc, vscode.ViewColumn.One);
                    const pos = new vscode.Position(msg.line, 0);
                    editor.selection = new vscode.Selection(pos, pos);
                    editor.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.InCenter);
                } catch (e) {}
            }
        }, undefined, context.subscriptions);
        classBrowserPanel.onDidDispose(() => { classBrowserPanel = null; }, null, context.subscriptions);
    }));

    let ExtensionMode;
    (function (ExtensionMode) {
        ExtensionMode[ExtensionMode["None"] = 0] = "None";
        ExtensionMode[ExtensionMode["Test"] = 1] = "Test";
        ExtensionMode[ExtensionMode["Dev"] = 2] = "Dev";
        ExtensionMode[ExtensionMode["Prod"] = 3] = "Prod";
    })(ExtensionMode || (ExtensionMode = {}));
    //@ts-ignore
    //If we are in dev mode, include this still, otherwise do not.
    //if(context.extensionMode == ExtensionMode.Dev){
    // treeDataProvider = new ComposerController_1.TreeDataProvider(context);
    // vscode.window.registerTreeDataProvider('composerExplorer', treeDataProvider);
    //}
    //Run this once on when vscode opens to initilaize the Variables array on the open file;
    // Parse, then always run diagnostics — even if parsing threw — so errors show in the editor.
    async function parseAndDiagnose(document) {
        if (!document) return;
        try { await ParseDocument(document); }
        catch (e) { console.error('[ParseDocument] failed for', document.uri && document.uri.toString(), e); }
        try { runDiagnostics(document); } catch (e) { console.error('[runDiagnostics] outer', e); }
    }
    setTimeout(() => {
        if (vscode.window.activeTextEditor) {
            parseAndDiagnose(vscode.window.activeTextEditor.document);
        }
    }, 100);
    vscode.window.onDidChangeActiveTextEditor(debounce(TextEditor => {
        if (TextEditor && TextEditor.document) {
            parseAndDiagnose(TextEditor.document);
        }
    }, 300, false));
    vscode.workspace.onDidChangeTextDocument(debounce(changeEvent => {
        if (changeEvent && changeEvent.document) {
            parseAndDiagnose(changeEvent.document);
        }
    }, 300, false));
    //This is where we will watch the document and when it finds variables put them into an array of typed vars
    //TODO: Accept an optional changeEvent param to only update the changed code, we can only do this once we impliment scopes.
    /**
     * Parses a given document to extract various elements such as variables, functions, classes, and includes.
     * The function processes the document line by line, using regular expressions to identify and categorize elements.
     * It also handles nested scopes and comments, and updates global variables, functions, and classes accordingly.
     *
     * @param {vscode.TextDocument} document - The document to be parsed.
     * @returns {Promise<void>} A promise that resolves when the parsing is complete.
     */
    async function ParseDocument(document) {
        // console.log(document);
        if (!document) {
            return;
        }
        var _a;
        if (document.languageId != "modscript") {
            return;
        }
        //var regex = /(?:var|global) (?<variable>[^\s,\.\(\\\/;]+) = (?<function>[^\s,\(\\\/;]+)/gm;
        var regex = /(?:var|global) (?<variable>[^\s,\.\(\\\/;]+) = (?<function>.+)/gm;
        var regexAllEquals = /^\s*(?<variable>[^\s,\.\(\\\/;]+) = (?<function>[^\s,\(\\\/;]+)/gm;
        var funcRegex = /^\s*def\s+(?:(?<ClassName>[\w]+)::)?(?<MeathodName>[\w]+)\((?<params>[\s\w,\s]*)\)\s*[^{]*{/g;
        var forLoopRegex = /for\s*\(\s*(?<variable>[^\s,\.\(\\\/;]+)\s*:\s*(?<rangeType>[^\s,\.\(\\\/;]+)\s*\)\s*{/g;
        var classRegex = /^\s*class\s+(?<ClassName>[^\s,\.\(\\\/;]+)\s*{/g;
        var classVariable = /(?:var|attr) (?<variable>[^\s,\.\(\\\/;]+)/g;
        var classVariableDeclaration = /this\.(?<variable>[^\s,\.\(\\\/;]+) = (?<function>.+)/g;
        var matches, specialMatches, forLoopMatches, output = [];
        var allEqualsMatches, allEquals = {};
        var includeMatch, includes = [];
        var funcMatch, newMeathods = [];
        var classMatch, newClasses = [];
        var classVarMatch, classVarDecMatch;
        var includeRegex = /^include\(\s*["'](?<import>[^,\(\\\/;]+)["']\s*\)/g;
        var bracketsStack = [];
        var bracketsDone = [];
        var isInComment = false;
        var tempFuncInfo = null;
        var tempClass = null;
        var ClassRange = null;
        bracketsDone.push(new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end));
        bracketsStack.push(bracketsDone[0]);
        for (let i = 0; i < document.lineCount; i++) {
            let line = document.lineAt(i).text;
            if (line.length > 5000) {
                continue;
            }
            if (isInComment) {
                if (line.match(/^[\s\S]*\*\//g)) {
                    isInComment = false;
                }
                else {
                    continue;
                }
            }
            else {
                if (line.match(/^[\s\S]*\/\*\*/g)) {
                    isInComment = true;
                    //Parse func comment and save in temp object;  /* */
                    tempFuncInfo = {
                        meathodName: "",
                        meathodDescription: "",
                        meathodParms: [],
                        meathodReturn: "",
                        meathodReturnDescription: ""
                    };
                    for (let j = i; j < document.lineCount; j++) {
                        let innerLine = document.lineAt(j).text;
                        //console.log("innerLine: ", innerLine);
                        if (innerLine.match(/^\s*\*\s+[\w]+/g)) {
                            tempFuncInfo.meathodDescription += innerLine.split("* ")[1] + " ";
                        }
                        else if (innerLine.match(/^\s*\*\s+@param\s+(\{[\w]+\}|\[[\w]+\])?/g)) {
                            let c_open = "";
                            let c_close = "@param";
                            let has_type = false;
                            if (innerLine.match(/\{[\w]+\}/g)) { // {type} description
                                c_open = "{";
                                c_close = "}";
                                has_type = true;
                            } else if (innerLine.match(/\[\w+\]/g)) { // [type] description
                                c_open = "[";
                                c_close = "]";
                                has_type = true;
                            }
                            let temp = {
                                name: "",
                                type: (has_type ? innerLine.split(c_open)[1].split(c_close)[0] : ""),
                                description: "",
                                optional: false
                            };
                            if (innerLine.split(c_close).length > 1) {
                                temp.description = innerLine.split(c_close)[1].trim();
                            }
                            // console.log("Temp: ", temp);
                            // console.log("line: ", innerLine);
                            tempFuncInfo.meathodParms.push(temp);
                        }
                        else if (innerLine.match(/^\s*\*\s+@(returns|return) (\{[\w]+\}|\[[\w]+\])?/g)) {
                            let c_open = "";
                            let c_close = "";
                            let has_type = false;
                            if (innerLine.match(/\{[\w]+\}/g)) { // {type} description
                                c_open = "{";
                                c_close = "}";
                                has_type = true;
                            }
                            else if (innerLine.match(/\[[\w]+\]/g)) { // [type] description
                                c_open = "[";
                                c_close = "]";
                                has_type = true;
                            }
                            else if (innerLine.match(/@returns/g)) { // no type
                                c_close = "@returns";
                            }
                            else if (innerLine.match(/@return/g)) { // no type
                                c_close = "@return";
                            }
                            if (has_type) {
                                tempFuncInfo.meathodReturn = innerLine.split(c_open)[1].split(c_close)[0];
                            }
                            if (innerLine.split(c_close).length > 1) {
                                tempFuncInfo.meathodReturnDescription = innerLine.split(c_close)[1].trim();
                            }
                        }
                        if (innerLine.match(/^\s*\*\//g)) {
                            j = document.lineCount;
                        }
                    }
                }
                else if (line.match(/^[\s\S]*\*\//g)) {
                    isInComment = true;
                }
                if (line.match(/^[\s\S]*\*\//g)) {
                    isInComment = false;
                    line = line.split("*/")[1];
                }
            }
            //document.lineAt(i).range.start
            // if(line.trim().slice(0,2) == "//" ){
            // 	continue;
            // }
            for (let j = 1; j < line.split("//")[0].split("{").length; j++) {
                let temp = new vscode.Range(document.lineAt(i).range.start, document.lineAt(i).range.start);
                //console.log("Start: ",j, line, document.lineAt(i).range.start.line)
                for (let out of output) {
                    //if(out.variable == "record"){debugger};
                    if (!out.range) {
                        out.range = bracketsStack[bracketsStack.length - 1]; //bracketsDone[bracketsStack.length];
                        if (bracketsStack.length == 1) {
                            out.GlobalScope = true;
                        }
                        else {
                            out.GlobalScope = false;
                        }
                    }
                }
                bracketsStack.push(temp);
                if (classMatch = classRegex.exec(line.split("//")[0])) {
                    tempClass = {
                        "className": classMatch.groups.ClassName,
                        "exposed": false,
                        "inheritsFrom": "",
                        "classDescription": "A custom class",
                        "meathods": [],
                        "properties": []
                    };
                    ClassRange = temp;
                }
            }
            for (let j = 1; j < line.split("//")[0].split("}").length; j++) {
                let temp = bracketsStack.pop();
                let newRange = temp.with(temp.start, document.lineAt(i).range.end);
                bracketsDone.push(newRange);
                // console.log("End: ",j, line, document.lineAt(i).range.end.line)
                for (let out of output) {
                    //if(out.variable == "record"){debugger};
                    if (!out.range || out.range == temp) {
                        out.range = newRange;
                        out.GlobalScope = false;
                    }
                }
                if (ClassRange && newRange.start.isEqual(ClassRange.start)) {
                    tempClass.range = newRange;
                    tempClass.sourceUri = document.uri.toString();  // file where this class is actually defined
                    newClasses.push(tempClass);
                    tempClass = null;
                    ClassRange = null;
                }
            }
            while (forLoopMatches = forLoopRegex.exec(line.split("//")[0])) {
                //This will not return correctly until the parser has run twice, wont effect much except for when the file is first opened.
                //Eventually we may want to lookup variable types inline to solve this. (or do these checks later in the parse after the other types are defined.)
                // if(globalVars[document.uri.toString()]){
                // 	for(let v of globalVars[document.uri.toString()]){
                // 		if(i>0){
                // 			if(v.variable == forLoopMatches.groups.function && v.range.contains(new vscode.Range(document.lineAt(i-1).range.start,document.lineAt(i-1).range.start))){ //TODO: Also check Scope here once that is implemented
                // 				//v.type = forLoopMatches.groups.type;
                // 				if(RangeTypes[v.type]){
                // 					forLoopMatches.groups.type = RangeTypes[v.type].innerType
                // 				}
                // 			}
                // 		}
                // 	}
                // }
                // if(!forLoopMatches.groups.type){
                forLoopMatches.groups.type = "Unknown";
                // }
                output.push(forLoopMatches.groups);
            }
            while (includeMatch = includeRegex.exec(line.split("//")[0])) {
                includes.push(includeMatch.groups.import);
            }
            while (matches = regex.exec(line.split("//")[0])) {
                const varObj = Object.assign({}, matches.groups);
                varObj.declarationLine = i;
                output.push(varObj);
            }
            while (classVarMatch = classVariable.exec(line.split("//")[0])) {
                if (ClassRange && ClassRange.isEqual(bracketsStack[bracketsStack.length - 1])) {
                    tempClass.properties.push({
                        "propertyDescription": "",
                        "propertyName": classVarMatch.groups.variable,
                        "propertyType": "",
                        "readOnly": false
                    });
                }
            }
            // console.log(tempClass);
            while (classVarDecMatch = classVariableDeclaration.exec(line.split("//")[0])) {
                if (ClassRange) {
                    for (let p of tempClass.properties) {
                        if (p.propertyName == classVarDecMatch.groups.variable) {
                            p.propertyType = classVarDecMatch.groups.function;
                        }
                    }
                    // tempClass.properties.push({
                    // 	"propertyDescription":"",
                    // 	"propertyName":classVarMatch.groups.variable,
                    // 	"propertyType":"",
                    // 	"readOnly":false
                    // })
                }
            }
            while (funcMatch = funcRegex.exec(line.split("//")[0])) {
                let meathod = {
                    meathodName: funcMatch.groups.MeathodName,
                    meathodDescription: "User Defined Function",
                    meathodParms: [],
                    meathodReturn: "",
                    meathodReturnDescription: "",
                    ownerClass: funcMatch.groups.ClassName || null  // set for "def Class::method" → method on a record/object, called as .method()
                };
                if (tempFuncInfo) {
                    meathod.meathodDescription = tempFuncInfo.meathodDescription;
                    meathod.meathodReturn = tempFuncInfo.meathodReturn || "Void";
                    meathod.meathodReturnDescription = tempFuncInfo.meathodReturnDescription || "";
                }
                if (ClassRange && tempClass.className == meathod.meathodName) {
                    meathod.meathodReturn = tempClass.className;
                }
                let params = funcMatch.groups.params;
                let q = 0;
                for (let param of params.split(",")) {
                    param = param.trim();
                    if (param) {
                        let type = "Variant";
                        if (param.split(/\s+/g).length > 1) {
                            type = param.split(/\s+/g)[0];
                            param = param.split(/\s+/g)[1];
                        }
                        let description = "";
                        if (tempFuncInfo && tempFuncInfo.meathodParms[q]) {
                            //@ts-ignore
                            type = tempFuncInfo.meathodParms[q].type || type;
                            description = tempFuncInfo.meathodParms[q].description;
                            q++;
                        }
                        let newParam = {
                            name: param,
                            type: type,
                            description: description,
                            optional: false
                        };
                        meathod.meathodParms.push(newParam);
                        output.push({
                            type: type,
                            variable: param,
                            range: null,
                            GlobalScope: false,
                            function: ""
                        });
                    }
                }
                // console.log("tempfuncinfo:");
                // console.log(tempFuncInfo);
                // tempFuncInfo = null;
                let tempposLine = document.lineAt(i).range.start.line - 3;
                let temposChar = document.lineAt(i).range.start.character;
                if (tempposLine > 0) {
                    meathod.range = new vscode.Range(new vscode.Position(tempposLine, temposChar), document.lineAt(i).range.start);
                }
                else {
                    meathod.range = new vscode.Range(document.lineAt(i).range.start, document.lineAt(i).range.start);
                }
                meathod.declarationRange = new vscode.Range(document.lineAt(i).range.start, document.lineAt(i).range.end);
                meathod.sourceUri = document.uri.toString();  // file where this function is actually defined (survives include() merging)
                if (ClassRange && tempClass.className != meathod.meathodName) {
                    tempClass.meathods.push(meathod);
                }
                else {
                    newMeathods.push(meathod);
                }
            }
            while (allEqualsMatches = regexAllEquals.exec(line)) {
                if (!allEquals[allEqualsMatches.groups.variable]) {
                    allEquals[allEqualsMatches.groups.variable] = allEqualsMatches.groups;
                }
            }
        }
        //console.log"before out", document.uri);
        for (let out of output) {
            if (!out.range) {
                out.range = bracketsDone[0];
                if (bracketsStack.length == 1) {
                    out.GlobalScope = true;
                }
                else {
                    out.GlobalScope = false;
                }
            }
        }
        //console.log"after out", document.uri);

        // console.log(bracketsDone);
        // console.log(output);
        var varList = [];
        let foundIncludeFile = false;
        for (let i of includes) {
            let uri = path.join(path.dirname(document.uri.toString()), "/", i + ".tscm");
            let thisSol = decodeURIComponent(document.uri.toString()).split("/")[1];
            let solName = thisSol;
            // console.log("sol: ", thisSol);
            // console.log("starting uri: ", uri);
            // console.log(treeDataProvider.openFiles);
            // console.log(ComposerController_1.solutions.solutions);
            //Check if this include is from the same solution or not
            let foundInOtherSol = false;
            let found = false;
            let checkUpdateModScript = {b:false, umsSol:null};
            for (let sol of ComposerController_1.solutions.solutions) {
                // console.log("script: ", sol.name + "/" + i + ".tscm")
                if (sol.name === "UpdateModScript") {
                    checkUpdateModScript = {b:true, umsSol:sol};
                    // console.log("found ums");
                    continue;
                }
                if (treeDataProvider.openFiles[sol.name + "/" + i + ".tscm"]) {
                    found = true;
                    if (sol.name == thisSol) {
                        break;
                    }
                    uri = path.join(treeDataProvider.openFiles[sol.name + "/" + i + ".tscm"].uri.toString());
                    solName = sol.name;
                    // console.log("new uri: ", uri);
                    foundInOtherSol = true;
                    if (checkUpdateModScript.b) {
                        checkUpdateModScript = {b:false, umsSol:null};
                    }
                    break;
                }
            }
            if (checkUpdateModScript.b) {
                let sol = checkUpdateModScript.umsSol;
                if (treeDataProvider.openFiles[sol.name + "/" + i + ".tscm"]) {
                    uri = path.join(treeDataProvider.openFiles[sol.name + "/" + i + ".tscm"].uri.toString());
                    foundInOtherSol = true;
                    found = true;
                    solName = sol.name;
                }
            }
            // open the file
            // console.log("uri: ", uri.toString());
            // console.log("textDocs: ", vscode.workspace.textDocuments);
            let filenameNM = uri.split("memfs_composer_file:")[1];
            // console.log("filenameNM: ", filenameNM);
            // for (let doc of vscode.workspace.textDocuments) {
            //     console.log("doc: ", doc.fileName);
            // }
            if (found && !vscode.workspace.textDocuments.find(x => x.fileName == filenameNM)) {
                // console.log("found doc");
                // console.log(filenameNM);
                // console.log("opening file: ", vscode.Uri.parse(`${ComposerController_1.MEM_FS_SCHEMA}:${filenameNM}`));
                filenameNM = filenameNM.replace(/\\/g, "/");
                vscode.workspace.openTextDocument(vscode.Uri.parse(`${ComposerController_1.MEM_FS_SCHEMA}:${filenameNM}`));
            }
            //first check if it is already parsed and added to globalVars
            // console.log("final uri: ", uri);
            let globalUri = i + ".tscm";
            let tempVars = null;
            for (let [name, temp] of Object.entries(globalVars)) {
                if (path.normalize(name) == uri) {
                    tempVars = temp;
                    // console.log(uri, tempVars)
                }
            }
            if (!tempVars) {
                for (let [name, temp] of Object.entries(globalVars)) {
                    if (path.normalize(name).includes(globalUri)) {
                        tempVars = temp;
                    }
                }
            }
            if (tempVars) {
                let temp = tempVars;
                temp = temp.filter(x => x.GlobalScope);
                temp.forEach(x => {
                    x.range = bracketsDone[0];
                });
                varList = varList.concat(temp);
                foundIncludeFile = true;
            }
            let tempFuncs = null;
            for (let [name, temp] of Object.entries(globalFuncs)) {
                if (path.normalize(name) == uri) {
                    tempFuncs = temp;
                }
            }
            if (!tempFuncs) {
                for (let [name, temp] of Object.entries(globalFuncs)) {
                    if (path.normalize(name).includes(globalUri)) {
                        tempFuncs = temp;
                    }
                }
            }
            if (tempFuncs) {
                newMeathods = newMeathods.concat(tempFuncs);
                foundIncludeFile = true;
            }
            // console.log("tempFuncs")
            // console.log(tempFuncs)
            let tempClass = null;
            //console.log"GlobalClasses 805:")
            //console.logglobalClasses);
            for (let [name, temp] of Object.entries(globalClasses)) {
                if (path.normalize(name) == uri) {
                    tempClass = temp;
                }
            }
            if (!tempClass) {
                //console.log"GlobalClasses 813:")
                //console.logglobalClasses);
                for (let [name, temp] of Object.entries(globalClasses)) {
                    if (path.normalize(name).includes(globalUri)) {
                        tempClass = temp;
                    }
                }
            }
            if (tempClass) {
                newClasses = newClasses.concat(tempClass);
                foundIncludeFile = true;
            }
            //console.log"document before try")
            //console.logdocument);
            if (!foundIncludeFile) {
                try {
                    //console.log"Loading file: ",`${document.uri.with({ path: path.posix.dirname(document.uri.path)})}/${i}.tscm`);
                    // console.log("uri:", uri);
                    // let docSrc = vscode.Uri.parse(`${document.uri.with({ path: path.posix.dirname(document.uri.path) })}/${i}.tscm`);
                    let docSrc = vscode.Uri.parse(`${document.uri.with({ path: "/" + solName })}/${i}.tscm`);
                    // console.log(docSrc);
                    let doc = await vscode.workspace.openTextDocument(docSrc);
                    //console.logdoc);
                    //console.log"----------------------------------------------------------------------");
                    await ParseDocument(doc);
                    let temp = globalVars[doc.uri.toString()];
                    temp = temp.filter(x => x.GlobalScope);
                    temp.forEach(x => {
                        x.range = bracketsDone[0];
                    });
                    varList = varList.concat(temp);
                    let tempFunc = globalFuncs[doc.uri.toString()];
                    newMeathods = newMeathods.concat(tempFunc);
                    //console.log"GlobalClasses 839:")
                    //console.logglobalClasses);
                    let tempClasses = globalClasses[doc.uri.toString()];
                    newClasses = newClasses.concat(tempClasses);
                }
                catch (error) {
                    //TODO: Check if document is on global, or other virtual folder somehow.
                    console.error(`Include document: "${i}" was not found in the same folder. SKIPING.`);
                }
            }
        }
        let forMatches = [];
        //console.log"before output")
        for (var v of output) {
                try {
                //console.log"======================== ITER START =============================", document.uri, "\n" ,v);
                let found = false;
                if (!v.type) {
                    if (v.function.match(/^"/g)) {
                        v.type = "string";
                    }
                    else if (v.function.match(/^\d+\.\d+/g)) {
                        v.type = "double";
                    }
                    else if (v.function.match(/^\d+/g)) {
                        v.type = "int";
                    }
                    else if (v.function.match(/^(true|false|True|False|TRUE|FALSE){1}/g)) {
                        v.type = "bool";
                    }
                    else if (v.function.match(/^\[/g)) {
                        v.type = "Vector";
                    }
                    else if (v.function.match(/^Variant/g)) {
                        if (allEquals[v.variable]) {
                            v.type = lookupClassFunctionReturn(allEquals[v.variable].function, varList, newMeathods, newClasses, v.range.start.translate(1));
                        }
                        else {
                            v.type = "Variant";
                        }
                    }
                    else {
                        let arr = GetArrayOfFunctions(v.function);
                        let tempClass = "";
                        for (let f of arr) {
                            tempClass = lookupClassFunctionReturn(tempClass + f, varList, newMeathods, newClasses, v.range.start.translate(1));
                        }
                        v.type = tempClass;
                        // console.log(v.function, "  -  ", tempClass, "  -  [" + arr.toString() + "]");
                    }
                    // console.log(v.function, v.function.match(/^\[/g))
                }
                for (let vi of varList) {
                    if (vi.variable == v.variable && vi.range.isEqual(v.range)) { //TODO: Also check Scope here once that is implemented
                        vi.type = v.type;
                        found = true;
                    }
                }
                //@ts-ignore
                if (!found && !v.rangeType) {
                    varList.push(v);
                    //@ts-ignore
                }
                else if (v.rangeType) {
                    forMatches.push(v);
                }
                }   catch (error) {
                    console.error(error);
                    //throw(error);
                }
            }
        //console.log"before formatches")
        for (let m of forMatches) {
            for (let v of varList) {
                let rangeStart = m.range.start.line;
                if (rangeStart > 0) {
                    rangeStart--;
                }
                if (v.variable == m.rangeType && v.range.contains(new vscode.Range(document.lineAt(rangeStart).range.start, document.lineAt(rangeStart).range.start))) { //TODO: Also check Scope here once that is implemented
                    if (Ranges_1.RangeTypes[v.type]) {
                        m.type = Ranges_1.RangeTypes[v.type].innerType;
                    }
                }
            }
        }
        //console.log"before newclasses")
        for (let c of newClasses) {
            //console.logc);
            for (let p of c.properties) {
                if (p.propertyType) {
                    let arr = GetArrayOfFunctions(p.propertyType);
                    let tempClass = "";
                    for (let f of arr) {
                        tempClass = lookupClassFunctionReturn(tempClass + f, varList, newMeathods, newClasses, v.range.start.translate(1));
                    }
                    p.propertyType = tempClass;
                    p.propertyDescription = `Property of type: **${tempClass}**`;
                }
            }
        }
        varList = varList.concat(forMatches);
        globalVars[document.uri.toString()] = varList;
        globalFuncs[document.uri.toString()] = newMeathods;
        globalClasses[document.uri.toString()] = newClasses;

        // Diagnostics run independently (see runDiagnostics) so a parse error never hides errors
        runDiagnostics(document);

        // Refresh the outline panel with newly parsed symbols
        if (outlineProvider) outlineProvider.refresh();
        // Refresh the class browser if it's open (new user functions/classes may have been found)
        if (classBrowserPanel) {
            classBrowserPanel.webview.postMessage({ cmd: 'setData', items: buildClassBrowserData() });
        }
    }
}
exports.activate = activate;
function GetArrayOfFunctions(func) {
    var stack = [];
    let total = [];
    let temp = "";
    // for(let l of func){
    //     if(l == "("){
    //         stack.push(temp);
    //         temp = "";
    //     }else if(l == ")"){
    //         temp = "";
    //         let popped = stack.pop();
    //         if(stack.length == 0){
    //             total.push(popped.match(/\S+$/g)[0]);
    //         }
    // 	}else if(l == "."){
    // 		if(stack.length == 0 && temp.includes(".")){
    // 			total.push(temp.match(/\S+$/g)[0]);
    // 			temp = ".";
    // 		}else{
    // 			temp += l;
    // 		}
    //     }else{
    //         temp += l;
    //     }
    // }
    // if(total.length == 0){
    // 	total.push(temp.match(/\S+$/g)[0]);
    // }
    for (let l of func) {
        if (l == "(") {
            stack.push(temp);
            temp = "";
        }
        else if (l == ")") {
            temp = "";
            let popped = stack.pop();
            try {
                if (stack.length == 0) {
                    total.push(popped.match(/\S+$/g)[0]);
                }
            } catch (error) {
                // console.log(popped, error);
            }
        }
        else if (l == ".") {
            if (stack.length == 0 && temp.includes(".")) {
                total.push(temp.match(/\S+$/g)[0]);
                temp = ".";
            }
            else {
                temp += l;
            }
        }
        else {
            temp += l;
        }
    }
    //TODO: Find way to get the tail end of the stack that is seperated by whitespace
    // if(stack.length == 0){
    // 	var tempstr = temp?.match(/\S+$/g)?.[0].replace(/;$/g,"");
    // 	if(tempstr){
    // 		total.push(tempstr);
    // 	}
    // }
    return total;
}
function lookupClassFunctionReturn(func, varList, funcList, classList, position) {
    if (func.includes(".")) {
        var CN = func.split(".")[0];
        var FN = func.split(".")[1];
    }
    else {
        var CN = "";
        var FN = func;
    }
    var tempClasses = Object.assign({}, classes);
    for (let cls of classList) {
        tempClasses[cls.className] = cls;
    }
    if (CN.toLowerCase() == "this") {
        for (let cls of classList) {
            if (cls.range.contains(position)) {
                CN = cls.className;
                break;
            }
        }
    }
    for (const [clsName, cls] of Object.entries(tempClasses)) {
        if (cls.className == CN) {
            if (cls.meathods) {
                for (const meth of cls.meathods) {
                    if (meth.meathodName == FN) {
                        return meth === null || meth === void 0 ? void 0 : meth.meathodReturn;
                    }
                }
            }
            if (cls.properties) {
                for (const prop of cls.properties) {
                    if (prop.propertyName == FN) {
                        return prop === null || prop === void 0 ? void 0 : prop.propertyType;
                    }
                }
            }
        }
    }
    if (CN == "") {
        for (var meth of funcList) {
            if (meth.meathodName == FN) {
                return meth === null || meth === void 0 ? void 0 : meth.meathodReturn;
            }
        }
    }
    for (const cls of varList) {
        if (cls.variable == CN && cls.range.contains(position)) {
            if (typeof cls.type != "undefined") {
                if (tempClasses[cls.type] == undefined) {
                    continue;
                }
                for (const meth of tempClasses[cls.type].meathods) {
                    if (meth.meathodName == FN) {
                        return meth === null || meth === void 0 ? void 0 : meth.meathodReturn;
                    }
                }
                if (tempClasses[cls.type].properties) {
                    for (const prop of tempClasses[cls.type].properties) {
                        if (prop.propertyName == FN) {
                            return prop === null || prop === void 0 ? void 0 : prop.propertyType;
                        }
                    }
                }
            }
        }
    }
    return null;
}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
var debounce = function (func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
};
// ─── Class Browser helpers ───────────────────────────────────────────────────
function getNonce() {
    let n = '';
    const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) n += c.charAt(Math.floor(Math.random() * c.length));
    return n;
}

function buildClassBrowserData() {
    const items = [];
    const pmap = p => ({ name: p.name || '', type: Array.isArray(p.type) ? p.type.join('|') : (p.type || ''), desc: p.description || '', opt: !!p.optional });

    for (const [, cls] of Object.entries(classes)) {
        if (cls.className === '') {
            for (const m of (cls.meathods || [])) {
                items.push({ id: 'f_' + m.meathodName, name: m.meathodName, kind: 'function', src: 'sbm',
                    desc: m.meathodDescription || '', params: (m.meathodParms || []).map(pmap),
                    ret: m.meathodReturn || 'Void', retDesc: m.meathodReturnDescription || '' });
            }
        } else {
            items.push({ id: 'c_' + cls.className, name: cls.className, kind: 'class', src: 'sbm',
                desc: cls.classDescription || '', exposed: !!cls.exposed,
                methods: (cls.meathods || []).map(m => ({ name: m.meathodName, desc: m.meathodDescription || '',
                    params: (m.meathodParms || []).map(pmap), ret: m.meathodReturn || 'Void', retDesc: m.meathodReturnDescription || '' })),
                props: (cls.properties || []).map(p => ({ name: p.propertyName || '', type: p.propertyType || '',
                    desc: p.propertyDescription || '', ro: !!p.readOnly })) });
        }
    }

    const seenF = new Set(), seenC = new Set();
    for (const [uri, funcs] of Object.entries(globalFuncs)) {
        for (const f of (funcs || [])) {
            // Functions defined as "def Owner::method" are object methods (called as .method()), not free functions
            const isMethod = !!f.ownerClass;
            const dedupKey = (f.ownerClass ? f.ownerClass + '::' : '') + f.meathodName;
            if (seenF.has(dedupKey)) continue; seenF.add(dedupKey);
            items.push({ id: 'uf_' + dedupKey, name: f.meathodName, kind: isMethod ? 'user-method' : 'user-function', src: 'user',
                owner: f.ownerClass || '',
                uri: f.sourceUri || uri, line: f.declarationRange ? f.declarationRange.start.line : -1,
                desc: (f.meathodDescription && f.meathodDescription !== 'User Defined Function') ? f.meathodDescription : '',
                params: (f.meathodParms || []).map(pmap), ret: f.meathodReturn || 'Void', retDesc: f.meathodReturnDescription || '' });
        }
    }
    for (const [uri, clsList] of Object.entries(globalClasses)) {
        for (const cls of (clsList || [])) {
            if (seenC.has(cls.className)) continue; seenC.add(cls.className);
            items.push({ id: 'uc_' + cls.className, name: cls.className, kind: 'user-class', src: 'user',
                uri: cls.sourceUri || uri, line: cls.range ? cls.range.start.line : -1, desc: cls.classDescription || '',
                methods: (cls.meathods || []).map(m => ({ name: m.meathodName, desc: m.meathodDescription || '',
                    params: (m.meathodParms || []).map(pmap), ret: m.meathodReturn || 'Void',
                    line: m.declarationRange ? m.declarationRange.start.line : -1 })),
                props: (cls.properties || []).map(p => ({ name: p.propertyName || '', type: p.propertyType || '', desc: p.propertyDescription || '' })) });
        }
    }
    // Global variables (and class instances) — mirror the outline's variable sections
    const seenG = new Set();
    const sbmClassByName = {};
    for (const [, c] of Object.entries(classes)) { if (c.className) sbmClassByName[c.className] = c; }
    for (const [uri, vars] of Object.entries(globalVars)) {
        for (const v of (vars || [])) {
            if (!v.variable || !v.GlobalScope) continue;
            if (seenG.has(v.variable)) continue; seenG.add(v.variable);
            const line = typeof v.declarationLine === 'number' ? v.declarationLine : (v.range ? v.range.start.line : -1);
            // Is it a class instance? Pull the class's methods so they show in the detail pane.
            let cls = null;
            if (v.type) {
                cls = (globalClasses[uri] || []).find(c => c.className === v.type) || sbmClassByName[v.type] || null;
            }
            const isInstance = !!(cls && (cls.meathods || []).length);
            items.push({
                id: 'ug_' + v.variable, name: v.variable, kind: isInstance ? 'user-instance' : 'user-global',
                src: 'user', uri, line, ret: v.type || '', owner: v.type || '',
                desc: isInstance ? `Global instance of ${v.type}` : (v.type ? `Global variable of type ${v.type}` : 'Global variable'),
                methods: isInstance ? (cls.meathods || []).map(m => ({ name: m.meathodName, desc: m.meathodDescription || '',
                    params: (m.meathodParms || []).map(pmap), ret: m.meathodReturn || 'Void' })) : []
            });
        }
    }
    return items;
}

function getClassBrowserHtml() {
    const css = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); background: var(--vscode-editor-background); display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
.toolbar { padding: 8px; border-bottom: 1px solid var(--vscode-panel-border); flex-shrink: 0; display: flex; flex-direction: column; gap: 6px; }
#search { width: 100%; padding: 5px 9px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border, #555); border-radius: 3px; font-size: 13px; outline: none; }
#search:focus { border-color: var(--vscode-focusBorder); }
.filters { display: flex; gap: 5px; flex-wrap: wrap; }
.pill { padding: 2px 10px; border-radius: 10px; font-size: 11px; cursor: pointer; border: 1px solid transparent; user-select: none; }
.pill.on { background: var(--vscode-button-background); color: var(--vscode-button-foreground); }
.pill.off { background: transparent; color: var(--vscode-descriptionForeground); border-color: var(--vscode-input-border, #555); }
.split { display: flex; flex: 1; overflow: hidden; }
.list-pane { width: 40%; min-width: 160px; overflow-y: auto; border-right: 1px solid var(--vscode-panel-border); }
.row { padding: 5px 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 12px; }
.row:hover { background: var(--vscode-list-hoverBackground); }
.row.sel { background: var(--vscode-list-activeSelectionBackground); color: var(--vscode-list-activeSelectionForeground); }
.ic { width: 16px; text-align: center; flex-shrink: 0; font-size: 13px; }
.rname { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rret { font-size: 10px; opacity: 0.6; flex-shrink: 0; max-width: 70px; overflow: hidden; text-overflow: ellipsis; }
.detail { flex: 1; overflow-y: auto; padding: 14px 16px; }
.detail h2 { font-size: 15px; margin-bottom: 5px; }
.badge { display: inline-block; font-size: 10px; padding: 1px 7px; border-radius: 8px; margin-bottom: 10px; background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); }
.sig { font-family: monospace; font-size: 12px; background: var(--vscode-textCodeBlock-background, #252526); padding: 8px 12px; border-radius: 4px; margin-bottom: 10px; word-break: break-all; white-space: pre-wrap; }
.desc { opacity: 0.85; margin-bottom: 10px; line-height: 1.5; font-size: 12px; }
.sec { font-size: 10px; text-transform: uppercase; letter-spacing: .06em; opacity: .55; margin: 12px 0 4px; }
.pr { padding: 3px 0; font-size: 12px; display: flex; gap: 6px; align-items: baseline; flex-wrap: wrap; }
.pname { font-weight: 600; }
.ptype { font-family: monospace; color: var(--vscode-symbolIcon-classForeground, #4ec9b0); }
.popt { opacity: 0.5; font-size: 10px; }
.mrow { padding: 5px 8px; cursor: pointer; border-radius: 3px; font-size: 12px; margin-bottom: 2px; }
.mrow:hover { background: var(--vscode-list-hoverBackground); }
.mrow code { font-family: monospace; }
.navlink { color: var(--vscode-textLink-foreground); cursor: pointer; font-size: 11px; margin-bottom: 8px; display: inline-block; }
.navlink:hover { text-decoration: underline; }
.empty { padding: 20px; opacity: .5; text-align: center; font-size: 12px; }
.grp { padding: 6px 10px 3px; font-size: 10px; text-transform: uppercase; letter-spacing: .06em; opacity: .6; font-weight: 600; position: sticky; top: 0; background: var(--vscode-editor-background); border-bottom: 1px solid var(--vscode-panel-border); }
.grpn { opacity: .6; font-weight: 400; }
`;
    const html = `
<div class="toolbar">
  <input id="search" type="text" placeholder="Search symbol, class, method...">
  <div class="filters">
    <span class="pill on" data-k="user-function">Custom functions</span>
    <span class="pill on" data-k="user-method">Object methods</span>
    <span class="pill on" data-k="user-class">Custom classes</span>
    <span class="pill on" data-k="user-global">Global variables</span>
    <span class="pill on" data-k="user-instance">Class instances</span>
    <span class="pill on" data-k="function">SBM functions</span>
    <span class="pill on" data-k="class">SBM classes</span>
  </div>
</div>
<div class="split">
  <div class="list-pane" id="LP"><p class="empty">Loading...</p></div>
  <div class="detail" id="DP"><p class="empty">Select an item from the list.</p></div>
</div>`;
    const js = `
(function() {
var vsc = acquireVsCodeApi();
var ALL = [], FIL = [], SEL = -1;
var AK = { 'class': true, 'function': true, 'user-class': true, 'user-function': true, 'user-method': true, 'user-global': true, 'user-instance': true };

// Section order in the list (top to bottom)
var SECTIONS = [
  { key: 'user-function', label: 'Custom functions' },
  { key: 'user-method',   label: 'Object methods', byOwner: true },
  { key: 'user-class',    label: 'Custom classes' },
  { key: 'user-instance', label: 'Class instances' },
  { key: 'user-global',   label: 'Global variables' },
  { key: 'function',      label: 'SBM functions' },
  { key: 'class',         label: 'SBM classes' }
];

document.querySelectorAll('.pill').forEach(function(el) {
  el.addEventListener('click', function() {
    var k = el.dataset.k;
    if (AK[k]) { AK[k] = false; el.className = 'pill off'; }
    else { AK[k] = true; el.className = 'pill on'; }
    render();
  });
});

var ICONS = { 'class': '[C]', 'function': '[F]', 'user-class': '[U]', 'user-function': '[fn]', 'user-method': '[m]', 'user-global': '[g]', 'user-instance': '[o]' };
function ic(k) { return ICONS[k] || '[-]'; }
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function buildSig(it) {
  if (it.kind==='class'||it.kind==='user-class') return 'class ' + it.name + ' { ' + (it.methods||[]).length + ' methods, ' + (it.props||[]).length + ' properties }';
  if (it.kind==='user-instance') return 'global ' + it.name + ' = ' + (it.owner||'?') + '()  { ' + (it.methods||[]).length + ' methods }';
  if (it.kind==='user-global') return 'global ' + it.name + (it.ret ? ': ' + it.ret : '');
  var p = (it.params||[]).map(function(p){ return (p.opt?'[':'')+p.name+': '+p.type+(p.opt?']':''); }).join(', ');
  if (it.kind==='user-method') return (it.owner?it.owner+'.':'')+it.name+'('+p+'): '+(it.ret||'Void');
  return (it.kind==='user-function'?'def ':'')+it.name+'('+p+'): '+(it.ret||'Void');
}

function render() {
  var q = document.getElementById('search').value.toLowerCase();
  var matched = ALL.filter(function(it) {
    if (!AK[it.kind]) return false;
    if (q && it.name.toLowerCase().indexOf(q) < 0 && (it.desc||'').toLowerCase().indexOf(q) < 0 && (it.owner||'').toLowerCase().indexOf(q) < 0) return false;
    return true;
  });

  // Build ordered groups (with sub-grouping by owner for object methods)
  var groups = [];
  SECTIONS.forEach(function(sec) {
    var inSec = matched.filter(function(it){ return it.kind === sec.key; });
    if (!inSec.length) return;
    if (sec.byOwner) {
      var owners = {};
      inSec.forEach(function(it){ var o = it.owner || '(other)'; (owners[o] = owners[o] || []).push(it); });
      Object.keys(owners).sort().forEach(function(o){ groups.push({ label: o, items: owners[o] }); });
    } else {
      groups.push({ label: sec.label, items: inSec });
    }
  });

  FIL = [];
  var LP = document.getElementById('LP');
  var h = '';
  groups.forEach(function(g) {
    h += '<div class="grp">' + esc(g.label) + ' <span class="grpn">' + g.items.length + '</span></div>';
    g.items.forEach(function(it) {
      var idx = FIL.length; FIL.push(it);
      var s = idx === SEL ? ' sel' : '';
      h += '<div class="row' + s + '" data-idx="' + idx + '">' +
           '<span class="ic">' + ic(it.kind) + '</span>' +
           '<span class="rname">' + esc(it.name) + '</span>' +
           (it.ret && it.ret !== 'Void' ? '<span class="rret">' + esc(it.ret) + '</span>' : '') +
           '</div>';
    });
  });
  LP.innerHTML = h || '<p class="empty">No results.</p>';
  if (SEL >= 0) { var se = LP.querySelector('.row[data-idx="' + SEL + '"]'); if (se) se.scrollIntoView({block:'nearest'}); }
}

document.getElementById('LP').addEventListener('click', function(e) {
  var row = e.target.closest('.row');
  if (!row) return;
  sel(parseInt(row.dataset.idx, 10));
});

document.getElementById('DP').addEventListener('click', function(e) {
  var mrow = e.target.closest('.mrow[data-uri]');
  if (mrow) vsc.postMessage({cmd:'navigate', uri:mrow.dataset.uri, line:parseInt(mrow.dataset.line,10)});
  var navlink = e.target.closest('.navlink[data-uri]');
  if (navlink) vsc.postMessage({cmd:'navigate', uri:navlink.dataset.uri, line:parseInt(navlink.dataset.line,10)});
});

function kindLabel(k) {
  return { 'class':'class', 'function':'function', 'user-class':'class', 'user-function':'function', 'user-method':'method', 'user-global':'global variable', 'user-instance':'class instance' }[k] || k;
}

function sel(i) {
  SEL = i; render(); var it = FIL[i]; if (!it) return;
  var h = '<h2>' + esc(it.name) + '</h2>';
  h += '<span class="badge">' + (it.src==='sbm'?'SBM API':'Custom') + ' &middot; ' + esc(kindLabel(it.kind)) + (it.owner ? ' of ' + esc(it.owner) : '') + '</span>';
  h += '<div class="sig">' + esc(buildSig(it)) + '</div>';
  if (it.desc) h += '<div class="desc">' + esc(it.desc) + '</div>';
  if (it.uri && it.line >= 0) h += '<a class="navlink" data-uri="' + esc(it.uri) + '" data-line="' + it.line + '">&rarr; Go to definition</a>';
  if (it.params && it.params.length) {
    h += '<div class="sec">Parameters</div>';
    it.params.forEach(function(p) {
      h += '<div class="pr"><span class="pname">' + esc(p.name) + '</span><span class="ptype">' + esc(p.type) + '</span>' + (p.opt ? '<span class="popt">optional</span>' : '') + (p.desc ? ' &mdash; ' + esc(p.desc) : '') + '</div>';
    });
  }
  if (it.ret && it.ret !== 'Void') h += '<div class="sec">Returns</div><div class="pr"><span class="ptype">' + esc(it.ret) + '</span>' + (it.retDesc ? ' &mdash; ' + esc(it.retDesc) : '') + '</div>';
  if (it.methods && it.methods.length) {
    h += '<div class="sec">Methods (' + it.methods.length + ')</div>';
    it.methods.forEach(function(m) {
      var mp = (m.params||[]).map(function(p){ return p.name+': '+p.type; }).join(', ');
      var nav = (it.uri && m.line >= 0) ? ' data-uri="' + esc(it.uri) + '" data-line="' + m.line + '"' : '';
      h += '<div class="mrow"' + nav + '><code><strong>' + esc(m.name) + '</strong>(' + esc(mp) + '): ' + esc(m.ret||'Void') + '</code>' + (m.desc ? '<br><span style="opacity:.6;font-size:11px">' + esc(m.desc) + '</span>' : '') + '</div>';
    });
  }
  if (it.props && it.props.length) {
    h += '<div class="sec">Properties (' + it.props.length + ')</div>';
    it.props.forEach(function(p) {
      h += '<div class="pr"><span class="pname">' + esc(p.name) + '</span><span class="ptype">' + esc(p.type) + '</span>' + (p.ro ? '<span class="popt">readonly</span>' : '') + (p.desc ? ' &mdash; ' + esc(p.desc) : '') + '</div>';
    });
  }
  document.getElementById('DP').innerHTML = h;
}

document.getElementById('search').addEventListener('input', function() { SEL = -1; render(); });
window.addEventListener('message', function(e) {
  if (e.data && e.data.cmd === 'setData') { ALL = e.data.items || []; SEL = -1; render(); }
});
vsc.postMessage({cmd:'ready'});
})();
`;
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n' +
        '<title>Modscript Reference</title>\n' +
        '<style>' + css + '</style>\n' +
        '</head>\n<body>\n' + html + '\n' +
        '<script>' + js + '</script>\n' +
        '</body>\n</html>';
}

function getSettingsPanelHtml() {
    const css = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); background: var(--vscode-editor-background); padding: 24px; max-width: 720px; margin: 0 auto; }
h1 { font-size: 20px; margin-bottom: 4px; }
.sub { opacity: .6; font-size: 12px; margin-bottom: 22px; }
.card { background: var(--vscode-editorWidget-background, rgba(127,127,127,.06)); border: 1px solid var(--vscode-panel-border); border-radius: 6px; padding: 16px 18px; margin-bottom: 18px; }
.card h2 { font-size: 14px; margin-bottom: 3px; display: flex; align-items: center; gap: 7px; }
.card .hint { opacity: .6; font-size: 11.5px; margin-bottom: 12px; line-height: 1.5; }
.repo { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border: 1px solid var(--vscode-panel-border); border-radius: 4px; margin-bottom: 6px; cursor: pointer; }
.repo:hover { background: var(--vscode-list-hoverBackground); }
.repo.sel { border-color: var(--vscode-focusBorder); background: var(--vscode-list-activeSelectionBackground); }
.repo input { accent-color: var(--vscode-button-background); }
.repo .rn { font-weight: 600; font-size: 13px; }
.repo .rp { opacity: .55; font-size: 11px; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.repo .rmeta { opacity: .5; font-size: 11px; }
.norepo { opacity: .55; font-size: 12px; padding: 8px 2px; }
.row { display: flex; gap: 8px; align-items: center; }
input[type=text] { flex: 1; padding: 6px 9px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border, #555); border-radius: 3px; font-size: 13px; outline: none; }
input[type=text]:focus { border-color: var(--vscode-focusBorder); }
button { padding: 6px 14px; border: none; border-radius: 3px; font-size: 13px; cursor: pointer; background: var(--vscode-button-secondaryBackground, #3a3d41); color: var(--vscode-button-secondaryForeground, #fff); }
button:hover { background: var(--vscode-button-secondaryHoverBackground, #45494e); }
button.primary { background: var(--vscode-button-background); color: var(--vscode-button-foreground); }
button.primary:hover { background: var(--vscode-button-hoverBackground); }
.actions { display: flex; gap: 9px; margin-top: 6px; align-items: center; }
.saved { color: var(--vscode-charts-green, #4caf50); font-size: 12px; opacity: 0; transition: opacity .2s; }
.saved.show { opacity: 1; }
.tg { display: block; padding: 6px 0; font-size: 13px; cursor: pointer; }
.tg input { vertical-align: middle; margin-right: 6px; accent-color: var(--vscode-button-background); }
.tg .td { display: block; margin-left: 22px; opacity: .6; font-size: 11.5px; }
.link { color: var(--vscode-textLink-foreground); cursor: pointer; font-size: 12.5px; }
.link:hover { text-decoration: underline; }
code { font-family: monospace; background: var(--vscode-textCodeBlock-background, #252526); padding: 1px 5px; border-radius: 3px; font-size: 12px; }
`;
    const html = `
<h1>Modscript Settings</h1>
<div class="sub">Configure the Composer Explorer without editing JSON.</div>

<div class="card">
  <h2>Repository</h2>
  <div class="hint">Pick which local repository the Composer Explorer should use. These are the numbered folders inside your Local Cache Path (<code id="root">…</code>).</div>
  <div id="repos"><div class="norepo">Loading…</div></div>
</div>

<div class="card">
  <h2>Export folder</h2>
  <div class="hint">Where exported Composer scripts are saved. Leave empty to use <code>Documents/SBM Composer/Imports</code>.</div>
  <div class="row">
    <input type="text" id="export" placeholder="Default (Documents/SBM Composer/Imports)">
    <button id="browse">Browse…</button>
  </div>
</div>

<div class="card">
  <h2>Features</h2>
  <div class="hint">Turn editor features on or off.</div>
  <label class="tg"><input type="checkbox" id="t_enableCompletion"> <b>Code completion (IntelliSense)</b><span class="td">Suggest keywords, snippets, classes, functions and project symbols as you type.</span></label>
  <label class="tg"><input type="checkbox" id="t_enableDiagnostics"> <b>Error checking</b><span class="td">Underline problems and list them under "Composer problems".</span></label>
  <label class="tg"><input type="checkbox" id="t_checkUndefinedVariables"> <b>Undefined variable warnings</b><span class="td">Flag identifiers not defined in the script, includes or repository.</span></label>
  <label class="tg"><input type="checkbox" id="t_enableHover"> <b>Hover tooltips</b><span class="td">Show a symbol's type/description on hover.</span></label>
  <label class="tg"><input type="checkbox" id="t_enableSignatureHelp"> <b>Parameter hints</b><span class="td">Show function parameters while typing a call.</span></label>
</div>

<div class="card">
  <h2>Keyboard shortcuts</h2>
  <div class="hint">Open VS Code's Keyboard Shortcuts editor pre-filtered to Modscript commands to view or rebind them.</div>
  <button id="keys">Open Keyboard Shortcuts</button>
</div>

<div class="actions">
  <button class="primary" id="save">Save settings</button>
  <span class="link" id="json">Edit settings.json</span>
  <span class="saved" id="savedMsg">✓ Saved</span>
</div>`;
    const js = `
(function() {
var vsc = acquireVsCodeApi();
var current = { repositoryFolder: '', exportFolder: '', repos: [] };

function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function renderRepos() {
  var c = document.getElementById('repos');
  if (!current.repos.length) {
    c.innerHTML = '<div class="norepo">No repositories found in the Local Cache Path. You can still type the folder name in settings.json.</div>';
    return;
  }
  var h = '';
  current.repos.forEach(function(r) {
    var sel = String(r.name) === String(current.repositoryFolder);
    var title = r.server ? r.server : ('Repository ' + r.name);
    var meta = r.server ? ('#' + r.name + (r.user ? ' · ' + r.user : '')) : (r.user || '');
    h += '<label class="repo' + (sel?' sel':'') + '" data-name="' + esc(r.name) + '">' +
         '<input type="radio" name="repo" value="' + esc(r.name) + '"' + (sel?' checked':'') + '>' +
         '<span class="rn">' + esc(title) + '</span>' +
         '<span class="rp">' + esc(r.path) + '</span>' +
         (meta ? '<span class="rmeta">' + esc(meta) + '</span>' : '') +
         '</label>';
  });
  c.innerHTML = h;
  c.querySelectorAll('input[name=repo]').forEach(function(el) {
    el.addEventListener('change', function() {
      current.repositoryFolder = el.value;
      c.querySelectorAll('.repo').forEach(function(x){ x.classList.toggle('sel', x.dataset.name === el.value); });
    });
  });
}

document.getElementById('browse').addEventListener('click', function(){ vsc.postMessage({cmd:'browseExport'}); });
document.getElementById('keys').addEventListener('click', function(){ vsc.postMessage({cmd:'openKeybindings'}); });
document.getElementById('json').addEventListener('click', function(){ vsc.postMessage({cmd:'openSettingsJson'}); });
var TOGGLE_KEYS = ['enableCompletion','enableDiagnostics','checkUndefinedVariables','enableHover','enableSignatureHelp'];
document.getElementById('save').addEventListener('click', function(){
  var toggles = {};
  TOGGLE_KEYS.forEach(function(k){ var el=document.getElementById('t_'+k); if(el) toggles[k]=el.checked; });
  vsc.postMessage({ cmd:'save', repositoryFolder: current.repositoryFolder, exportFolder: document.getElementById('export').value.trim(), toggles: toggles });
});

window.addEventListener('message', function(e) {
  var m = e.data;
  if (m.cmd === 'init') {
    current.repositoryFolder = m.repositoryFolder;
    current.exportFolder = m.exportFolder;
    current.repos = m.repos || [];
    document.getElementById('root').textContent = m.root || '(not found)';
    document.getElementById('export').value = m.exportFolder || '';
    if (m.toggles) TOGGLE_KEYS.forEach(function(k){ var el=document.getElementById('t_'+k); if(el) el.checked = m.toggles[k] !== false; });
    renderRepos();
  } else if (m.cmd === 'exportPicked') {
    document.getElementById('export').value = m.path;
  } else if (m.cmd === 'saved') {
    var s = document.getElementById('savedMsg');
    s.classList.add('show');
    setTimeout(function(){ s.classList.remove('show'); }, 2500);
  }
});
vsc.postMessage({cmd:'ready'});
})();
`;
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n' +
        '<title>Modscript Settings</title>\n' +
        '<style>' + css + '</style>\n' +
        '</head>\n<body>\n' + html + '\n' +
        '<script>' + js + '</script>\n' +
        '</body>\n</html>';
}

// mediaBase = webview URI of the extension's /media folder (for screenshots)
function getWelcomeHtml(mediaBase) {
    const css = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); background: var(--vscode-editor-background); padding: 32px 28px 60px; max-width: 860px; margin: 0 auto; line-height: 1.5; }
.hero { text-align: center; margin-bottom: 34px; }
.hero h1 { font-size: 26px; margin-bottom: 8px; }
.hero p { opacity: .7; font-size: 14px; }
.card { display: flex; gap: 20px; align-items: flex-start; padding: 20px 0; border-top: 1px solid var(--vscode-panel-border); }
.card:first-of-type { border-top: none; }
.card .txt { flex: 1; min-width: 0; }
.card h2 { font-size: 16px; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
.card p { opacity: .82; font-size: 13px; margin-bottom: 12px; }
.card ul { margin: 0 0 12px 18px; font-size: 12.5px; opacity: .82; }
.card li { margin-bottom: 3px; }
.shot { width: 320px; flex-shrink: 0; border: 1px solid var(--vscode-panel-border); border-radius: 6px; overflow: hidden; background: var(--vscode-editorWidget-background, rgba(127,127,127,.06)); }
.shot img { width: 100%; display: block; }
.shot .ph { min-height: 150px; display: flex; align-items: center; justify-content: center; text-align: center; padding: 18px; font-size: 12px; opacity: .55; }
button { padding: 7px 15px; border: none; border-radius: 4px; font-size: 13px; cursor: pointer; background: var(--vscode-button-background); color: var(--vscode-button-foreground); }
button:hover { background: var(--vscode-button-hoverBackground); }
button.sec { background: var(--vscode-button-secondaryBackground, #3a3d41); color: var(--vscode-button-secondaryForeground, #fff); }
kbd { font-family: monospace; background: var(--vscode-textCodeBlock-background, #252526); border: 1px solid var(--vscode-panel-border); border-radius: 3px; padding: 1px 6px; font-size: 11px; }
.foot { text-align: center; margin-top: 30px; opacity: .5; font-size: 11.5px; }
code { font-family: monospace; background: var(--vscode-textCodeBlock-background, #252526); padding: 1px 5px; border-radius: 3px; font-size: 12px; }
.feats { width: 100%; border-collapse: collapse; font-size: 12.5px; margin-top: 12px; }
.feats th { text-align: left; padding: 7px 10px; border-bottom: 2px solid var(--vscode-panel-border); opacity: .7; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; }
.feats td { padding: 7px 10px; border-bottom: 1px solid var(--vscode-panel-border); vertical-align: top; }
.feats td:first-child { font-weight: 600; white-space: nowrap; }
.feats code { font-size: 11px; }
`;
    // Each card: optional screenshot (drop a PNG into media/<file> to replace the placeholder)
    function shot(file, caption) {
        return '<div class="shot">' +
            '<img src="' + mediaBase + '/' + file + '" alt="" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
            '<div class="ph" style="display:none">📸 Add a screenshot at<br><code>media/' + file + '</code><br><br>' + caption + '</div>' +
            '</div>';
    }
    const html = `
<div class="hero">
  <h1>👋 Welcome to Modscript IntelliSense</h1>
  <p>Modern editing for SBM Composer scripts — explorer, outline, reference browser and more.</p>
</div>

<div class="card">
  <div class="txt">
    <h2>📁 Composer Explorer</h2>
    <p>Browse and open the scripts in your local SBM repository directly inside VS Code, grouped by solution.</p>
    <ul><li>Search &amp; fuzzy-search files</li><li>Open, edit and save checked-out scripts</li><li>Expand / collapse all solutions</li></ul>
    <button class="sec" data-cmd="openComposer">Open Composer Explorer</button>
  </div>
  ${shot('welcome-composer.png', 'The Composer Explorer in the activity bar')}
</div>

<div class="card">
  <div class="txt">
    <h2>🧭 Modscript Outline</h2>
    <p>A live outline of the current script, grouped into <b>Basic functions</b>, <b>Object methods</b> (grouped by owner, called as <code>.method()</code>) and <b>Classes</b>. Click any symbol to jump to its definition.</p>
    <ul><li>Toggle functions / classes / methods</li><li>Jumps to the right file, even across <code>include()</code></li><li>Also available via <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd></li></ul>
    <button class="sec" data-cmd="revealOutline">Reveal Outline</button>
  </div>
  ${shot('welcome-outline.png', 'Grouped symbols in the outline')}
</div>

<div class="card">
  <div class="txt">
    <h2>📚 Reference Browser</h2>
    <p>A searchable, split-view reference of the whole SBM API plus your own symbols — classes, free functions, object methods and properties with signatures and descriptions.</p>
    <ul><li>Filter by kind, search by name</li><li>Go to definition for your own symbols</li></ul>
    <button data-cmd="openReference">Open Reference Browser</button>
  </div>
  ${shot('welcome-reference.png', 'The reference browser panel')}
</div>

<div class="card">
  <div class="txt">
    <h2>⚙️ Settings panel</h2>
    <p>Pick your repository from a list (shown by server name, e.g. <code>CDT-SBM-02</code>), set the export folder and open keyboard shortcuts — no JSON editing. Switching repository reloads the explorer instantly.</p>
    <button data-cmd="openSettings">Open Settings</button>
  </div>
  ${shot('welcome-settings.png', 'The graphical settings panel')}
</div>

<div class="card">
  <div class="txt">
    <h2>✨ Snippets</h2>
    <p>Type a prefix and press Tab for ready-made blocks.</p>
    <ul><li><code>def</code>, <code>defclass</code>, <code>class</code></li><li><code>forloop</code>, <code>foridx</code>, <code>whileloop</code></li><li><code>ifel</code>, <code>trycatch</code>, <code>tryfinally</code>, <code>switch</code>, <code>lambda</code></li></ul>
  </div>
  ${shot('welcome-snippets.png', 'Snippets and inline hints')}
</div>

<h2 style="margin-top:34px;border-top:1px solid var(--vscode-panel-border);padding-top:24px">📋 All features &amp; shortcuts</h2>
<table class="feats">
  <tr><th>Feature</th><th>How to use</th></tr>
  <tr><td>Code completion (IntelliSense)</td><td>Type — keywords, snippets, classes, functions, variables; members after <code>.</code></td></tr>
  <tr><td>Usage-ranked completion</td><td>Classes/functions found in your scripts are offered first, ranked by how often they're used</td></tr>
  <tr><td>Signature help (parameter hints)</td><td>Inside a call, or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Space</kbd></td></tr>
  <tr><td>Hover info</td><td>Hover a symbol — shows its type/description</td></tr>
  <tr><td>Go to Definition</td><td><kbd>F12</kbd> or <kbd>Ctrl</kbd>+Click</td></tr>
  <tr><td>Find All References</td><td><kbd>Shift</kbd>+<kbd>F12</kbd></td></tr>
  <tr><td>Rename Symbol</td><td><kbd>F2</kbd></td></tr>
  <tr><td>Document Symbols / Outline jump</td><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd></td></tr>
  <tr><td>Auto-import</td><td>Selecting a class/function from another script auto-adds its <code>include()</code> (or <kbd>Ctrl</kbd>+<kbd>.</kbd>)</td></tr>
  <tr><td>Diagnostics (Composer problems)</td><td>Flags identifiers not defined anywhere in the project as errors (toggle in settings)</td></tr>
  <tr><td>JSDoc generator</td><td>Type <code>/**</code> above a function</td></tr>
  <tr><td>General snippets</td><td><code>def</code> <code>defclass</code> <code>class</code> <code>forloop</code> <code>foridx</code> <code>whileloop</code> <code>ifel</code> <code>trycatch</code> <code>tryfinally</code> <code>switch</code> <code>lambda</code></td></tr>
  <tr><td>SBM API snippets</td><td><code>getfield</code> <code>getfieldint</code> <code>setfield</code> <code>loginfo</code> <code>logerror</code> <code>logwarn</code> <code>seterror</code> <code>recordadd</code></td></tr>
  <tr><td>Modscript Outline</td><td>Composer activity bar — grouped, colored symbols; toggles for functions/classes/methods/global variables/class instances; click to jump</td></tr>
  <tr><td>Reference Browser</td><td>Outline toolbar 📚 button, or <b>Modscript: Open Reference Browser</b></td></tr>
  <tr><td>Settings panel</td><td>Composer Explorer ⚙️ button, or <b>Modscript: Open settings panel</b></td></tr>
  <tr><td>Repository name in title</td><td>Shown as “Composer Explorer - &lt;repo&gt;”</td></tr>
  <tr><td>Checked Out view</td><td>Lists checked-out scripts; checking one out opens it automatically</td></tr>
  <tr><td>Favourites</td><td>Right-click a script → <b>Add to Favourites</b> (☆ inline button)</td></tr>
  <tr><td>Code Snippets</td><td>Named snippets — + to add, click to insert, or select code → right-click → Save to Code Snippets</td></tr>
  <tr><td>Windows Event Viewer</td><td><b>Modscript: Open Windows Event Viewer</b> — filter/refresh Windows logs in VS Code</td></tr>
  <tr><td>Search all scripts</td><td><b>Modscript: Search All Scripts</b> — persistent, clickable list of every script by name</td></tr>
  <tr><td>Configuration &amp; Tools</td><td>A view under Code Snippets listing all panels &amp; settings — click to open</td></tr>
  <tr><td>Feature toggles</td><td>Settings panel (or settings.json): turn completion, diagnostics, hover and signature help on/off</td></tr>
  <tr><td>Czech language</td><td>UI follows the VS Code display language (cs supported)</td></tr>
  <tr><td>Welcome page</td><td><b>Modscript: Open Welcome</b></td></tr>
</table>

<div class="foot">You can reopen this page any time: Command Palette → <b>Modscript: Open Welcome</b></div>`;
    const js = `
(function() {
var vsc = acquireVsCodeApi();
document.querySelectorAll('button[data-cmd]').forEach(function(b) {
  b.addEventListener('click', function() { vsc.postMessage({ cmd: b.dataset.cmd }); });
});
})();
`;
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n' +
        '<title>Welcome to Modscript</title>\n' +
        '<style>' + css + '</style>\n' +
        '</head>\n<body>\n' + html + '\n' +
        '<script>' + js + '</script>\n' +
        '</body>\n</html>';
}

function getEventViewerHtml() {
    const css = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); background: var(--vscode-editor-background); display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
.toolbar { padding: 8px; border-bottom: 1px solid var(--vscode-panel-border); flex-shrink: 0; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
select, input { padding: 4px 8px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border, #555); border-radius: 3px; font-size: 12px; outline: none; }
#filter { flex: 1; min-width: 120px; }
button { padding: 4px 12px; border: none; border-radius: 3px; font-size: 12px; cursor: pointer; background: var(--vscode-button-background); color: var(--vscode-button-foreground); }
button:hover { background: var(--vscode-button-hoverBackground); }
button.sec { background: var(--vscode-button-secondaryBackground, #3a3d41); color: var(--vscode-button-secondaryForeground, #fff); }
.wrap { flex: 1; overflow: auto; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th { position: sticky; top: 0; background: var(--vscode-editor-background); text-align: left; padding: 5px 8px; border-bottom: 2px solid var(--vscode-panel-border); font-size: 10px; text-transform: uppercase; opacity: .7; }
td { padding: 4px 8px; border-bottom: 1px solid var(--vscode-panel-border); vertical-align: top; }
tr:hover td { background: var(--vscode-list-hoverBackground); }
.msg { white-space: pre-wrap; word-break: break-word; max-width: 600px; }
.lvl { font-weight: 600; }
.lvl.Error { color: var(--vscode-errorForeground, #f48771); }
.lvl.Warning { color: var(--vscode-editorWarning-foreground, #cca700); }
.time { white-space: nowrap; opacity: .8; }
.src { white-space: nowrap; }
.empty { padding: 20px; opacity: .6; text-align: center; }
.count { opacity: .6; font-size: 11px; }
`;
    const html = `
<div class="toolbar">
  <label>Log
    <select id="log">
      <option>Application</option>
      <option>System</option>
      <option>Security</option>
      <option>Setup</option>
      <option>Windows PowerShell</option>
    </select>
  </label>
  <label>Level
    <select id="level">
      <option value="">All</option>
      <option>Error</option>
      <option>Warning</option>
      <option>Information</option>
    </select>
  </label>
  <label>Computer <input id="computer" type="text" placeholder="localhost" list="hosts" style="width:170px"><datalist id="hosts"></datalist></label>
  <input id="filter" type="text" placeholder="Filter by source or message...">
  <button id="refresh">Refresh</button>
  <button class="sec" id="clear">Clear view</button>
  <span class="count" id="count"></span>
</div>
<div id="note" style="display:none;padding:6px 10px;background:var(--vscode-inputValidation-warningBackground,#5a4a1a);border-bottom:1px solid var(--vscode-panel-border);font-size:11.5px"></div>
<div class="wrap" id="wrap"><p class="empty">Loading…</p></div>`;
    const js = `
(function() {
var vsc = acquireVsCodeApi();
var ALL = [];
function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function render() {
  var lvl = document.getElementById('level').value;
  var q = document.getElementById('filter').value.toLowerCase();
  var rows = ALL.filter(function(e){
    if (lvl && e.level !== lvl) return false;
    if (q && (String(e.source||'')+' '+String(e.message||'')).toLowerCase().indexOf(q) < 0) return false;
    return true;
  });
  document.getElementById('count').textContent = rows.length + ' / ' + ALL.length + ' events';
  var w = document.getElementById('wrap');
  if (!rows.length) { w.innerHTML = '<p class="empty">No matching events.</p>'; return; }
  var h = '<table><thead><tr><th>Time</th><th>Level</th><th>Id</th><th>Source</th><th>Message</th></tr></thead><tbody>';
  for (var i=0;i<rows.length;i++){ var e=rows[i];
    h += '<tr><td class="time">'+esc((e.time||'').replace('T',' ').replace(/\\..*$/,''))+'</td>'+
         '<td class="lvl '+esc(e.level)+'">'+esc(e.level)+'</td>'+
         '<td>'+esc(e.id)+'</td>'+
         '<td class="src">'+esc(e.source)+'</td>'+
         '<td class="msg">'+esc(e.message)+'</td></tr>';
  }
  w.innerHTML = h + '</tbody></table>';
}
function fetchNow(){ var n=document.getElementById('note'); n.style.display='none'; document.getElementById('wrap').innerHTML='<p class="empty">Loading…</p>'; vsc.postMessage({cmd:'fetch', log:document.getElementById('log').value, computer:document.getElementById('computer').value.trim(), max:300}); }
document.getElementById('refresh').addEventListener('click', fetchNow);
document.getElementById('log').addEventListener('change', fetchNow);
document.getElementById('computer').addEventListener('keydown', function(e){ if(e.key==='Enter') fetchNow(); });
document.getElementById('level').addEventListener('change', render);
document.getElementById('filter').addEventListener('input', render);
document.getElementById('clear').addEventListener('click', function(){ ALL=[]; render(); document.getElementById('wrap').innerHTML='<p class="empty">View cleared. Click Refresh to reload.</p>'; });
window.addEventListener('message', function(ev){ var m=ev.data;
  if(m.cmd==='config'){ if(m.computer) document.getElementById('computer').value=m.computer;
    var dl=document.getElementById('hosts'); dl.innerHTML='<option value="localhost">'+(m.hosts||[]).map(function(h){return '<option value="'+esc(h)+'">';}).join('');
    fetchNow(); }
  else if(m.cmd==='data'){
    if(m.computer) document.getElementById('computer').value=m.computer;
    if(m.error){ document.getElementById('wrap').innerHTML='<p class="empty">Error: '+esc(m.error)+'<br><br>Try setting Computer to <b>localhost</b>.</p>'; document.getElementById('count').textContent=''; return;}
    ALL=m.events||[]; render();
    if(m.note){ var n=document.getElementById('note'); n.textContent=m.note; n.style.display='block'; }
  }
});
vsc.postMessage({cmd:'ready'});
})();
`;
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n' +
        '<title>Windows Event Viewer</title>\n<style>' + css + '</style>\n</head>\n<body>\n' +
        html + '\n<script>' + js + '</script>\n</body>\n</html>';
}

function getScriptSearchHtml() {
    const css = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); background: var(--vscode-editor-background); display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
.bar { padding: 10px; border-bottom: 1px solid var(--vscode-panel-border); display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
#q { flex: 1; padding: 8px 12px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border, #555); border-radius: 4px; font-size: 15px; outline: none; }
#q:focus { border-color: var(--vscode-focusBorder); }
.count { opacity: .6; font-size: 11px; white-space: nowrap; }
.split { display: flex; flex: 1; overflow: hidden; }
.list { width: 42%; min-width: 220px; overflow: auto; border-right: 1px solid var(--vscode-panel-border); }
.row { padding: 5px 12px; cursor: pointer; border-bottom: 1px solid var(--vscode-panel-border); }
.row:hover { background: var(--vscode-list-hoverBackground); }
.row.sel { background: var(--vscode-list-activeSelectionBackground); color: var(--vscode-list-activeSelectionForeground); }
.r1 { display: flex; align-items: center; gap: 8px; font-size: 12.5px; }
.ic { font-size: 10px; width: 26px; flex-shrink: 0; opacity: .8; }
.nm { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; }
.ln { opacity: .5; font-size: 11px; white-space: nowrap; }
.r2 { font-family: monospace; font-size: 11px; opacity: .7; margin-left: 26px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.r2 b { color: var(--vscode-editor-findMatchHighlightForeground, inherit); background: var(--vscode-editor-findMatchHighlightBackground, rgba(255,220,0,.35)); }
.preview { flex: 1; overflow: auto; padding: 12px 14px; }
.pv-h { font-size: 13px; font-weight: 600; margin-bottom: 2px; }
.pv-sub { opacity: .6; font-size: 11px; margin-bottom: 12px; }
.code { font-family: monospace; font-size: 12px; white-space: pre; }
.cl { display: flex; }
.cl .gut { width: 44px; text-align: right; padding-right: 10px; opacity: .4; flex-shrink: 0; user-select: none; }
.cl .txt { white-space: pre; }
.cl.hit { background: var(--vscode-editor-findMatchHighlightBackground, rgba(255,220,0,.18)); }
.cl.hit .txt b { background: var(--vscode-editor-findMatchHighlightBackground, rgba(255,220,0,.45)); }
.c-cmt { color: #6A9955; font-style: italic; }
.c-str { color: #ce9178; }
.c-num { color: #b5cea8; }
.c-kw { color: #569cd6; }
.c-typ { color: var(--vscode-symbolIcon-classForeground, #4ec9b0); }
.c-fn { color: var(--vscode-symbolIcon-functionForeground, #dcdcaa); }
.empty { padding: 24px; opacity: .55; text-align: center; }
.openbtn { margin-top: 14px; padding: 6px 14px; border: none; border-radius: 4px; cursor: pointer; background: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 12px; }
`;
    const html = `
<div class="bar">
  <input id="q" type="text" placeholder="Search everywhere in scripts…" autofocus>
  <span class="count" id="count"></span>
</div>
<div class="split">
  <div class="list" id="list"><p class="empty">Type to search…</p></div>
  <div class="preview" id="preview"><p class="empty">Select a result to preview.</p></div>
</div>`;
    const js = `
(function(){
var vsc = acquireVsCodeApi();
var M = [], SEL = 0, lastQ = '';
function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function hl(s, q){ s = esc(s); if(!q) return s; var i = s.toLowerCase().indexOf(q.toLowerCase()); if(i<0) return s; return s.slice(0,i)+'<b>'+s.slice(i,i+q.length)+'</b>'+s.slice(i+q.length); }
var KW={def:1,'var':1,global:1,attr:1,'class':1,'if':1,'else':1,'for':1,'while':1,'switch':1,'case':1,'default':1,'return':1,'break':1,'continue':1,'try':1,'catch':1,'finally':1,'this':1,include:1,fun:1,'new':1,'true':1,'false':1,'null':1,'in':1,is:1,'and':1,'or':1,'not':1};
var TYP={bool:1,int:1,integer:1,string:1,'double':1,'float':1,'long':1,date:1,datetime:1,variant:1,object:1,'void':1,'char':1,'byte':1,'short':1,decimal:1,number:1};
function synHL(s){ s=String(s||''); var out='',i=0,n=s.length;
  while(i<n){ var ch=s[i];
    if(ch==='/'&&s[i+1]==='/'){ out+='<span class="c-cmt">'+esc(s.slice(i))+'</span>'; break; }
    if(ch==='/'&&s[i+1]==='*'){ var e=s.indexOf('*/',i+2); var end=e<0?n:e+2; out+='<span class="c-cmt">'+esc(s.slice(i,end))+'</span>'; i=end; continue; }
    if(ch==='"'||ch==="'"){ var q=ch,j=i+1; while(j<n&&s[j]!==q){ if(s[j]==='\\\\')j++; j++; } j=j<n?j+1:n; out+='<span class="c-str">'+esc(s.slice(i,j))+'</span>'; i=j; continue; }
    if(ch>='0'&&ch<='9'){ var j2=i; while(j2<n&&((s[j2]>='0'&&s[j2]<='9')||s[j2]==='.'))j2++; out+='<span class="c-num">'+esc(s.slice(i,j2))+'</span>'; i=j2; continue; }
    if(/[A-Za-z_]/.test(ch)){ var j3=i; while(j3<n&&/[A-Za-z0-9_]/.test(s[j3]))j3++; var w=s.slice(i,j3); var cl=KW[w]?'c-kw':(TYP[w]?'c-typ':(s[j3]==='('?'c-fn':null)); out+=cl?'<span class="'+cl+'">'+esc(w)+'</span>':esc(w); i=j3; continue; }
    out+=esc(ch); i++;
  }
  return out;
}
function renderList(){
  var L = document.getElementById('list');
  document.getElementById('count').textContent = M.length ? (M.length + ' results') : '';
  if (!M.length) { L.innerHTML = '<p class="empty">No matches.</p>'; document.getElementById('preview').innerHTML='<p class="empty">No matches.</p>'; return; }
  if (SEL >= M.length) SEL = M.length-1; if (SEL < 0) SEL = 0;
  var h = '';
  for (var i=0;i<M.length;i++){ var m=M[i];
    h += '<div class="row'+(i===SEL?' sel':'')+'" data-idx="'+i+'">'+
         '<div class="r1"><span class="ic">'+(m.type==='javascript'?'JS':'MS')+'</span><span class="nm">'+esc(m.name)+'</span>'+
         (m.nameOnly?'':'<span class="ln">:'+(m.line+1)+'</span>')+'</div>'+
         (m.lineText?'<div class="r2">'+hl(m.lineText, lastQ)+'</div>':'')+'</div>';
  }
  L.innerHTML = h;
  var se = L.querySelector('.row.sel'); if (se) se.scrollIntoView({block:'nearest'});
  renderPreview();
}
function renderPreview(){
  var m = M[SEL], P = document.getElementById('preview');
  if (!m){ P.innerHTML='<p class="empty">Select a result.</p>'; return; }
  var h = '<div class="pv-h">'+esc(m.name)+'</div><div class="pv-sub">'+esc(m.solution)+' · '+(m.type==='javascript'?'Javascript':'Modscript')+(m.nameOnly?'':' · line '+(m.line+1))+'</div>';
  if (m.context && m.context.length){
    h += '<div class="code">';
    for (var j=0;j<m.context.length;j++){ var c=m.context[j];
      h += '<div class="cl'+(c.hit?' hit':'')+'"><span class="gut">'+(c.n+1)+'</span><span class="txt">'+synHL(c.text)+'</span></div>';
    }
    h += '</div>';
  }
  h += '<div><button class="openbtn" id="openbtn">Open script ↗</button></div>';
  P.innerHTML = h;
  var b=document.getElementById('openbtn'); if(b) b.addEventListener('click', function(){ openIdx(SEL); });
}
function openIdx(i){ var m=M[i]; if(m) vsc.postMessage({cmd:'open', id:m.id, line:m.line||0}); }
var t;
document.getElementById('q').addEventListener('input', function(){ clearTimeout(t); t=setTimeout(function(){ vsc.postMessage({cmd:'search', q:document.getElementById('q').value}); }, 150); });
document.getElementById('q').addEventListener('keydown', function(e){
  if(e.key==='ArrowDown'){ SEL++; renderList(); e.preventDefault(); }
  else if(e.key==='ArrowUp'){ SEL--; renderList(); e.preventDefault(); }
  else if(e.key==='Enter'){ openIdx(SEL); }
});
document.getElementById('list').addEventListener('click', function(e){ var r=e.target.closest('.row'); if(r){ SEL=parseInt(r.dataset.idx,10); renderList(); } });
document.getElementById('list').addEventListener('dblclick', function(e){ var r=e.target.closest('.row'); if(r){ SEL=parseInt(r.dataset.idx,10); openIdx(SEL); } });
window.addEventListener('message', function(ev){ var d=ev.data; if(d.cmd==='results'){ lastQ=d.q||''; M=d.matches||[]; SEL=0; renderList(); document.getElementById('q').focus(); } });
vsc.postMessage({cmd:'ready'});
})();
`;
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n' +
        '<title>Search Everywhere</title>\n<style>' + css + '</style>\n</head>\n<body>\n' +
        html + '\n<script>' + js + '</script>\n</body>\n</html>';
}

// ─── Modscript Outline: tree item ───────────────────────────────────────────
class OutlineItem extends vscode.TreeItem {
    constructor(label, collapsibleState, type, data, docUri) {
        super(label, collapsibleState);
        this.type = type;  // 'function' | 'class' | 'method'
        this.data = data;
        this.docUri = docUri || null;
    }
}

// ─── Modscript Outline: tree data provider ───────────────────────────────────
class ModscriptOutlineProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.showFunctions = true;
        this.showClasses = true;
        this.showMethods = true;
        this.showGlobals = true;          // global variables section
        this.showInstances = true;        // global variables that hold a class instance
        this.lastUri = null;  // keeps symbols visible after switching away from .tscm
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        return element;
    }

    // Build a leaf OutlineItem for a function/method definition
    _makeFuncItem(func, fallbackUri, kind) {
        const params = (func.meathodParms || []).map(p => {
            const t = Array.isArray(p.type) ? p.type.join('|') : (p.type || 'Variant');
            return `${p.name}: ${t}`;
        }).join(', ');
        const item = new OutlineItem(
            `${func.meathodName}(${params})`,
            vscode.TreeItemCollapsibleState.None,
            kind,
            func,
            func.sourceUri || fallbackUri
        );
        item.iconPath = kind === 'method'
            ? new vscode.ThemeIcon('symbol-method', new vscode.ThemeColor('symbolIcon.methodForeground'))
            : new vscode.ThemeIcon('symbol-function', new vscode.ThemeColor('symbolIcon.functionForeground'));
        item.description = func.meathodReturn || '';
        const desc = func.meathodDescription && func.meathodDescription !== 'User Defined Function'
            ? func.meathodDescription.trim() : '';
        item.tooltip = func.ownerClass
            ? `${func.ownerClass}.${func.meathodName}()${desc ? '\n' + desc : ''}`
            : desc;
        return item;
    }

    // Build a leaf OutlineItem for a global variable
    _makeGlobalItem(v, uri) {
        const line = typeof v.declarationLine === 'number' ? v.declarationLine : (v.range ? v.range.start.line : 0);
        const data = { declarationRange: new vscode.Range(line, 0, line, 0) };
        const item = new OutlineItem(v.variable, vscode.TreeItemCollapsibleState.None, 'global', data, uri);
        item.iconPath = new vscode.ThemeIcon('symbol-variable', new vscode.ThemeColor('symbolIcon.variableForeground'));
        item.description = v.type || '';
        item.tooltip = `global ${v.variable}${v.type ? ': ' + v.type : ''}`;
        return item;
    }

    getChildren(element) {
        if (element) {
            // Category node → its precomputed function/method children
            if (element.type === 'category') {
                return (element.data.funcs || []).map(f =>
                    this._makeFuncItem(f, element.data.uri, element.data.childKind));
            }
            // Globals category → its variable leaves
            if (element.type === 'gcat') {
                return (element.data.vars || []).map(v => this._makeGlobalItem(v, element.data.uri));
            }
            // Class node → its methods
            if (element.type === 'class' && this.showMethods) {
                const docUri = element.docUri;
                return (element.data.meathods || []).map(meth =>
                    this._makeFuncItem(meth, docUri, 'method'));
            }
            // Class-instance global → the methods you can call on it
            if (element.type === 'instance') {
                const cls = element.data.cls;
                return (cls.meathods || []).map(meth => this._makeFuncItem(meth, element.docUri, 'method'));
            }
            return [];
        }

        // Root level — use lastUri as fallback so outline stays populated when editor loses focus
        const editor = vscode.window.activeTextEditor;
        let uri;
        if (editor && editor.document.languageId === 'modscript') {
            uri = editor.document.uri.toString();
            this.lastUri = uri;
        } else if (this.lastUri) {
            uri = this.lastUri;
        } else {
            const placeholder = new vscode.TreeItem('Open a .tscm file');
            placeholder.iconPath = new vscode.ThemeIcon('info');
            return [placeholder];
        }

        const funcs = globalFuncs[uri] || [];
        const clses = globalClasses[uri] || [];
        const roots = [];

        if (this.showFunctions) {
            // Split free functions (callable directly) from object methods (def Owner::method → call as .method())
            const freeFuncs = funcs.filter(f => !f.ownerClass);
            const byOwner = {};
            for (const f of funcs) {
                if (!f.ownerClass) continue;
                (byOwner[f.ownerClass] = byOwner[f.ownerClass] || []).push(f);
            }

            // Category: basic/free functions
            if (freeFuncs.length) {
                const cat = new OutlineItem(
                    'Basic functions',
                    vscode.TreeItemCollapsibleState.Expanded,
                    'category',
                    { funcs: freeFuncs, uri, childKind: 'function' }
                );
                cat.iconPath = new vscode.ThemeIcon('symbol-namespace', new vscode.ThemeColor('symbolIcon.namespaceForeground'));
                cat.description = `${freeFuncs.length}`;
                cat.tooltip = 'Functions you can call directly';
                roots.push(cat);
            }

            // One category per owner type — these are methods on records/objects, called as .method()
            for (const owner of Object.keys(byOwner).sort()) {
                const cat = new OutlineItem(
                    owner,
                    vscode.TreeItemCollapsibleState.Collapsed,
                    'category',
                    { funcs: byOwner[owner], uri, childKind: 'method' }
                );
                cat.iconPath = new vscode.ThemeIcon('symbol-object', new vscode.ThemeColor('symbolIcon.objectForeground'));
                cat.description = `.methods · ${byOwner[owner].length}`;
                cat.tooltip = `Methods of "${owner}" — called as ${owner}.method()`;
                roots.push(cat);
            }
        }

        if (this.showClasses) {
            for (const cls of clses) {
                const hasMethods = this.showMethods && (cls.meathods || []).length > 0;
                const item = new OutlineItem(
                    cls.className,
                    hasMethods ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None,
                    'class',
                    cls,
                    cls.sourceUri || uri
                );
                item.iconPath = new vscode.ThemeIcon('symbol-class', new vscode.ThemeColor('symbolIcon.classForeground'));
                item.description = `${(cls.meathods || []).length} methods`;
                item.tooltip = cls.classDescription || cls.className;
                roots.push(item);
            }
        }

        // Global variables — and, separately, globals that hold a class instance (with callable methods)
        if (this.showGlobals || this.showInstances) {
            const vars = globalVars[uri] || [];
            const seen = new Set();
            const plainGlobals = [];
            const instances = [];
            for (const v of vars) {
                if (!v.variable || !v.GlobalScope) continue;
                const key = v.variable.toLowerCase();
                if (seen.has(key)) continue;
                seen.add(key);
                let cls = null;
                if (v.type) {
                    cls = clses.find(c => c.className === v.type) ||
                          (classes[v.type] && classes[v.type].className ? classes[v.type] : null);
                }
                if (cls && (cls.meathods || []).length) instances.push({ v, cls });
                else plainGlobals.push(v);
            }

            if (this.showGlobals && plainGlobals.length) {
                const cat = new OutlineItem(
                    'Global variables',
                    vscode.TreeItemCollapsibleState.Collapsed,
                    'gcat',
                    { vars: plainGlobals, uri }
                );
                cat.iconPath = new vscode.ThemeIcon('symbol-variable', new vscode.ThemeColor('symbolIcon.variableForeground'));
                cat.description = `${plainGlobals.length}`;
                cat.tooltip = 'Global variables in this script';
                roots.push(cat);
            }

            if (this.showInstances) {
                for (const { v, cls } of instances) {
                    const line = typeof v.declarationLine === 'number' ? v.declarationLine : (v.range ? v.range.start.line : 0);
                    const data = { declarationRange: new vscode.Range(line, 0, line, 0), cls };
                    const item = new OutlineItem(
                        v.variable,
                        vscode.TreeItemCollapsibleState.Collapsed,
                        'instance',
                        data,
                        uri
                    );
                    item.iconPath = new vscode.ThemeIcon('symbol-object', new vscode.ThemeColor('symbolIcon.variableForeground'));
                    item.description = `${v.type} · ${(cls.meathods || []).length} methods`;
                    item.tooltip = `${v.variable} = ${v.type}() — methods you can call on it`;
                    roots.push(item);
                }
            }
        }

        return roots;
    }
}

// ─── Checked-out scripts view ────────────────────────────────────────────────
class CheckedOutProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh() { this._onDidChangeTreeData.fire(); }
    getTreeItem(e) { return e; }
    getChildren(element) {
        if (element) return [];
        let list = [];
        try { list = ComposerController_1.getCheckedOutScripts(); } catch (e) { }
        if (!list.length) {
            const ph = new vscode.TreeItem('No scripts checked out');
            ph.iconPath = new vscode.ThemeIcon('info');
            return [ph];
        }
        return list.map(s => {
            const item = new vscode.TreeItem(s.name);
            item.description = `${s.solution} · ${s.type === 'script' ? 'Script' : 'JS'}`;
            item.tooltip = `${s.name} — checked out`;
            item.iconPath = new vscode.ThemeIcon('verified-filled', new vscode.ThemeColor('gitDecoration.modifiedResourceForeground'));
            item.contextValue = 'checkedOutScript';
            item.resourceScriptId = s.id;
            item.scriptName = s.name;
            item.scriptInfo = s;
            item.command = { command: 'composerExplorer.openFile', title: 'Open', arguments: [s.id] };
            return item;
        });
    }
}

// ─── Favourites view ─────────────────────────────────────────────────────────
class FavouritesProvider {
    constructor(context) {
        this.context = context;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh() { this._onDidChangeTreeData.fire(); }
    getTreeItem(e) { return e; }
    getFavourites() { return this.context.globalState.get('modscript.favourites', []); }
    async addFavourite(fav) {
        if (!fav || !fav.id) return;
        const favs = this.getFavourites();
        if (favs.some(f => f.id === fav.id)) {
            vscode.window.showInformationMessage(`"${fav.name}" is already in favourites.`);
            return;
        }
        favs.push(fav);
        await this.context.globalState.update('modscript.favourites', favs);
        this.refresh();
        vscode.window.showInformationMessage(`Added "${fav.name}" to favourites.`);
    }
    async removeFavourite(id) {
        const favs = this.getFavourites().filter(f => f.id !== id);
        await this.context.globalState.update('modscript.favourites', favs);
        this.refresh();
    }
    getChildren(element) {
        if (element) return [];
        const favs = this.getFavourites();
        if (!favs.length) {
            const ph = new vscode.TreeItem('No favourites yet — right-click a script → Add to Favourites');
            ph.iconPath = new vscode.ThemeIcon('star-empty');
            return [ph];
        }
        return favs.map(f => {
            const item = new vscode.TreeItem(f.name);
            item.description = f.solution ? `${f.solution} · ${f.type === 'script' ? 'Script' : 'JS'}` : '';
            item.tooltip = f.name;
            item.iconPath = new vscode.ThemeIcon('star-full', new vscode.ThemeColor('charts.yellow'));
            item.contextValue = 'favouriteScript';
            item.resourceScriptId = f.id;
            item.command = { command: 'composerExplorer.openFile', title: 'Open', arguments: [f.id] };
            return item;
        });
    }
}

// ─── Knowledge base view (named code snippets) ───────────────────────────────
const KB_SEED = [
    { name: 'SelectSearch', body: 'def SelectSearch(table tableName, string searchField, string searchValue) {\n\tvar results = tableName.Search(searchField + " = \'" + searchValue + "\'");\n\treturn results;\n}' },
    { name: 'template_class', body: 'class ${ClassName} {\n\tvar field;\n\n\tdef ${ClassName}() {\n\t\t// constructor\n\t}\n\n\tdef ${ClassName}::method(param) {\n\t\treturn param;\n\t}\n}' }
];
class KnowledgeBaseProvider {
    constructor(context) {
        this.context = context;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        // Seed defaults on first run
        if (!context.globalState.get('modscript.kbSeeded')) {
            context.globalState.update('modscript.kb', KB_SEED.slice());
            context.globalState.update('modscript.kbSeeded', true);
        }
    }
    refresh() { this._onDidChangeTreeData.fire(); }
    getTreeItem(e) { return e; }
    getEntries() { return this.context.globalState.get('modscript.kb', []); }
    async addEntry(name, body) {
        const entries = this.getEntries();
        const existing = entries.findIndex(e => e.name === name);
        if (existing >= 0) entries[existing] = { name, body };
        else entries.push({ name, body });
        await this.context.globalState.update('modscript.kb', entries);
        this.refresh();
    }
    async removeEntry(name) {
        const entries = this.getEntries().filter(e => e.name !== name);
        await this.context.globalState.update('modscript.kb', entries);
        this.refresh();
    }
    getChildren(element) {
        if (element) return [];
        const entries = this.getEntries();
        if (!entries.length) {
            const ph = new vscode.TreeItem('Empty — use the + button to add a snippet');
            ph.iconPath = new vscode.ThemeIcon('add');
            return [ph];
        }
        return entries.map(e => {
            const item = new vscode.TreeItem(e.name);
            const firstLine = (e.body || '').split('\n')[0];
            item.description = firstLine.length > 40 ? firstLine.slice(0, 40) + '…' : firstLine;
            item.tooltip = e.body;
            item.iconPath = new vscode.ThemeIcon('symbol-snippet', new vscode.ThemeColor('charts.blue'));
            item.contextValue = 'kbEntry';
            item.kbName = e.name;
            item.kbBody = e.body;
            item.command = { command: 'extension.kbInsert', title: 'Insert', arguments: [e] };
            return item;
        });
    }
}

// ─── Configuration & Tools view (hub of panels/settings) ─────────────────────
class ToolsProvider {
    getTreeItem(e) { return e; }
    getChildren(element) {
        const mk = (label, desc, icon, command, args) => {
            const it = new vscode.TreeItem(label);
            it.description = desc;
            it.iconPath = new vscode.ThemeIcon(icon);
            it.command = { command, title: label, arguments: args || [] };
            return it;
        };
        if (element && element.toolsGroup === 'panels') {
            return [
                mk('Composer Explorer', 'Repository scripts', 'list-tree', 'composerExplorer.focus'),
                mk('Checked Out', 'Currently checked-out scripts', 'verified', 'modscriptCheckedOut.focus'),
                mk('Favourites', 'Your starred scripts', 'star-full', 'modscriptFavourites.focus'),
                mk('Code Snippets', 'Saved code blocks', 'symbol-snippet', 'modscriptKnowledgeBase.focus'),
                mk('Modscript Outline', 'Symbols in the open script', 'symbol-class', 'modscriptOutline.focus')
            ];
        }
        if (element && element.toolsGroup === 'tools') {
            return [
                mk('Settings', 'Repository, export folder, features', 'settings-gear', 'extension.openSettingsPanel'),
                mk('Reference Browser', 'SBM API + your symbols', 'library', 'extension.openClassBrowser'),
                mk('Search all scripts', 'Find any script by name', 'search', 'extension.searchAllScripts'),
                mk('Windows Event Viewer', 'Windows logs inside VS Code', 'output', 'extension.openEventViewer'),
                mk('Welcome / Guide', 'Features & shortcuts', 'book', 'extension.openWelcome'),
                mk('Keyboard Shortcuts', 'View / rebind commands', 'keyboard', 'workbench.action.openGlobalKeybindings', ['Modscript']),
                mk('Edit settings.json', 'Raw configuration file', 'json', 'workbench.action.openSettingsJson')
            ];
        }
        if (element) return [];
        // Root: two collapsible groups
        const panels = new vscode.TreeItem('Panels', vscode.TreeItemCollapsibleState.Expanded);
        panels.toolsGroup = 'panels';
        panels.iconPath = new vscode.ThemeIcon('window');
        const tools = new vscode.TreeItem('Tools & Settings', vscode.TreeItemCollapsibleState.Expanded);
        tools.toolsGroup = 'tools';
        tools.iconPath = new vscode.ThemeIcon('tools');
        return [panels, tools];
    }
}
//# sourceMappingURL=extension.js.map