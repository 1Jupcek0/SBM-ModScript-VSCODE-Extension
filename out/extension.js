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
const Ranges_1 = require("./Ranges");
let languageKeywords = ["var", "global", "def", "try", "catch", "finally", "if", "else", "while", "for", "case", "default", "switch", "return", "break", "continue", "this"];
/**
 * Activates the extension and registers various providers for the "modscript" language.
 * 
 * @param {vscode.ExtensionContext} context - The context in which the extension is activated.
 */
function activate(context) {
    // Register the tree data provider and tree view
    treeDataProvider = new ComposerController_1.TreeDataProvider(context);
    treeView = vscode.window.createTreeView('composerExplorer', {
        showCollapseAll: true,
        treeDataProvider: treeDataProvider
    });

    vscode.window.registerTreeDataProvider('composerExplorer', treeDataProvider);
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
            exportFolder: cfg.get('exportFolder') || ''
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
                    settingsPanel.webview.postMessage({ cmd: 'saved' });
                    // Switch the Composer Explorer to the new repository live — no host restart,
                    // so it works every time you change it (including switching back).
                    if (newRepo !== prevRepo) {
                        try {
                            ComposerController_1.setRepository(newRepo);
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

    // Show the welcome page automatically on first install/activation
    if (!context.globalState.get('modscript.welcomeShown')) {
        context.globalState.update('modscript.welcomeShown', true);
        // slight delay so it opens after the workbench has settled
        setTimeout(openWelcome, 800);
    }
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
            return compitems;
        }
    });
    // Gives autocomplete on function that are meathods of a class or variable of a class.
    const provider2 = vscode.languages.registerCompletionItemProvider('modscript', {
        provideCompletionItems(document, position) {
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
            return result || undefined;
        }
    }, '.' // triggered whenever a '.' is being typed
    );
    //Gives function signiture completion on function paramaters and gives info about the function. 
    const providor3 = vscode.languages.registerSignatureHelpProvider("modscript", {
        provideSignatureHelp(document, position, token, context) {
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
            for (var meth of globalFuncs[document.uri.toString()]) {
                if (meth.range.contains(position)) {
                    let commitCharacterCompletion = new vscode.CompletionItem("JSDOC Documentation...", vscode.CompletionItemKind.Snippet);
                    let tempString = "\n * ${1:" + meth.meathodName + " Description}\n";
                    let index = 2;
                    for (let param of meth.meathodParms) {
                        if (param.type != "Variant") {
                            tempString += " * @param {${" + index++ + "|" + param.type + "," + variableTypesString + "|}} ${" + index++ + ":" + param.name + " Paramater Description}\n";
                        }
                        else {
                            tempString += " * @param {${" + index++ + "|" + variableTypesString + "|}} ${" + index++ + ":" + param.name + " Paramater Description}\n";
                        }
                    }
                    if (meth.meathodReturn !== "Void") {
                        tempString += " * @returns {${" + index++ + "|" + variableTypesString + "|}} ${" + index++ + ":Return Description}\n */";
                    } else {
                        tempString += "*/";
                    }
                    commitCharacterCompletion.insertText = new vscode.SnippetString(tempString);
                    compitems.push(commitCharacterCompletion);
                }
            }
            if (compitems.length == 0) {
                let commitCharacterCompletion = new vscode.CompletionItem("JSDOC Documentation...", vscode.CompletionItemKind.Snippet);
                //commitCharacterCompletion.documentation = new vscode.MarkdownString(cls.classDescription);
                commitCharacterCompletion.insertText = new vscode.SnippetString("\n* ${1: Description}\n* @param {${2|" + variableTypesString + "|}} ${3:Paramater Description}\n* @returns {${4|" + variableTypesString + "|}} ${5:Return Description}\n*/");
                compitems.push(commitCharacterCompletion);
            }
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

    // Create diagnostic collection for error/warning markers
    diagnosticCollection = vscode.languages.createDiagnosticCollection('modscript');
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
    setTimeout(() => {
        if (vscode.window.activeTextEditor) {
            ParseDocument(vscode.window.activeTextEditor.document);
        }
    }, 100);
    vscode.window.onDidChangeActiveTextEditor(debounce(TextEditor => {
        if (TextEditor && TextEditor.document) {
            ParseDocument(TextEditor.document);
        }
    }, 300, false));
    vscode.workspace.onDidChangeTextDocument(debounce(changeEvent => {
        if (changeEvent && changeEvent.document) {
            ParseDocument(changeEvent.document);
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
var AK = { 'class': true, 'function': true, 'user-class': true, 'user-function': true, 'user-method': true };

// Section order in the list (top to bottom)
var SECTIONS = [
  { key: 'user-function', label: 'Custom functions' },
  { key: 'user-method',   label: 'Object methods', byOwner: true },
  { key: 'user-class',    label: 'Custom classes' },
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

var ICONS = { 'class': '[C]', 'function': '[F]', 'user-class': '[U]', 'user-function': '[fn]', 'user-method': '[m]' };
function ic(k) { return ICONS[k] || '[-]'; }
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function buildSig(it) {
  if (it.kind==='class'||it.kind==='user-class') return 'class ' + it.name + ' { ' + (it.methods||[]).length + ' methods, ' + (it.props||[]).length + ' properties }';
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
  return { 'class':'class', 'function':'function', 'user-class':'class', 'user-function':'function', 'user-method':'method' }[k] || k;
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
document.getElementById('save').addEventListener('click', function(){
  vsc.postMessage({ cmd:'save', repositoryFolder: current.repositoryFolder, exportFolder: document.getElementById('export').value.trim() });
});

window.addEventListener('message', function(e) {
  var m = e.data;
  if (m.cmd === 'init') {
    current.repositoryFolder = m.repositoryFolder;
    current.exportFolder = m.exportFolder;
    current.repos = m.repos || [];
    document.getElementById('root').textContent = m.root || '(not found)';
    document.getElementById('export').value = m.exportFolder || '';
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
        item.iconPath = new vscode.ThemeIcon(kind === 'method' ? 'symbol-method' : 'symbol-function');
        item.description = func.meathodReturn || '';
        const desc = func.meathodDescription && func.meathodDescription !== 'User Defined Function'
            ? func.meathodDescription.trim() : '';
        item.tooltip = func.ownerClass
            ? `${func.ownerClass}.${func.meathodName}()${desc ? '\n' + desc : ''}`
            : desc;
        return item;
    }

    getChildren(element) {
        if (element) {
            // Category node → its precomputed function/method children
            if (element.type === 'category') {
                return (element.data.funcs || []).map(f =>
                    this._makeFuncItem(f, element.data.uri, element.data.childKind));
            }
            // Class node → its methods
            if (element.type === 'class' && this.showMethods) {
                const docUri = element.docUri;
                return (element.data.meathods || []).map(meth =>
                    this._makeFuncItem(meth, docUri, 'method'));
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
                cat.iconPath = new vscode.ThemeIcon('symbol-namespace');
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
                cat.iconPath = new vscode.ThemeIcon('symbol-object');
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
                item.iconPath = new vscode.ThemeIcon('symbol-class');
                item.description = `${(cls.meathods || []).length} methods`;
                item.tooltip = cls.classDescription || cls.className;
                roots.push(item);
            }
        }

        return roots;
    }
}
//# sourceMappingURL=extension.js.map