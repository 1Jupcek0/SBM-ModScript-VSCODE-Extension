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
                    detail: 'Definice funkce',
                    snippet: 'def ${1:nazevFunkce}(${2:parametry}) {\n\t$0\n}'
                },
                {
                    label: 'defclass',
                    detail: 'Definice metody třídy',
                    snippet: 'def ${1:Trida}::${2:metoda}(${3:parametry}) {\n\t$0\n}'
                },
                {
                    label: 'class',
                    detail: 'Definice třídy',
                    snippet: 'class ${1:NazevTridy} {\n\tvar ${2:pole};\n\n\tdef ${1:NazevTridy}() {\n\t\t$0\n\t}\n}'
                },
                {
                    label: 'forloop',
                    detail: 'For cyklus přes kolekci',
                    snippet: 'for (${1:item} : ${2:kolekce}) {\n\t$0\n}'
                },
                {
                    label: 'foridx',
                    detail: 'For cyklus s indexem',
                    snippet: 'for (var ${1:i} = 0; ${1:i} < ${2:delka}; ${1:i}++) {\n\t$0\n}'
                },
                {
                    label: 'ifel',
                    detail: 'If-else blok',
                    snippet: 'if (${1:podminka}) {\n\t$0\n} else {\n\t\n}'
                },
                {
                    label: 'trycatch',
                    detail: 'Try-catch blok',
                    snippet: 'try {\n\t$0\n} catch (${1:e}) {\n\t\n}'
                },
                {
                    label: 'tryfinally',
                    detail: 'Try-catch-finally blok',
                    snippet: 'try {\n\t$0\n} catch (${1:e}) {\n\t\n} finally {\n\t\n}'
                },
                {
                    label: 'whileloop',
                    detail: 'While cyklus',
                    snippet: 'while (${1:podminka}) {\n\t$0\n}'
                },
                {
                    label: 'switch',
                    detail: 'Switch příkaz',
                    snippet: 'switch (${1:hodnota}) {\n\tcase ${2:pripad}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}'
                },
                {
                    label: 'vartype',
                    detail: 'Proměnná s určením typu (anotace)',
                    snippet: '//var ${1:promenna} is ${2:Typ}'
                },
                {
                    label: 'lambda',
                    detail: 'Lambda funkce',
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
    
    //Auto Commplete for "//Var variable is Type" comments to set type when the parser doesnt get it right.
    const provider5 = vscode.languages.registerCompletionItemProvider("modscript", {
        provideCompletionItems(document, position, token, context) {
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            //if(linePrefix.trim().slice(0,2) != "//" || linePrefix.slice(linePrefix.length - 3,linePrefix.length) != "is "){
            if (!linePrefix.match(/\/\/\s*(var|global)\s[A-Za-z0-9]+\sis\s$/g)) {
                return;
            }
            const compitems = [];
            for (const [clsName, cls] of Object.entries(classes)) {
                if (cls.className != "") {
                    let commitCharacterCompletion = new vscode.CompletionItem(cls.className, vscode.CompletionItemKind.Class);
                    commitCharacterCompletion.commitCharacters = ['.'];
                    commitCharacterCompletion.documentation = new vscode.MarkdownString(cls.classDescription);
                    compitems.push(commitCharacterCompletion);
                }
            }
            return compitems;
        }
    }, ' ');
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
    context.subscriptions.push(provider1, provider2, providor3, providor4, provider5, provider6, provider7, provider8);

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

    // Code Actions provider — quick fix "Add type annotation" for unknown-type variables
    const providerCodeActions = vscode.languages.registerCodeActionsProvider('modscript', {
        provideCodeActions(document, range, context, token) {
            const actions = [];
            for (const diag of context.diagnostics) {
                if (diag.code !== 'unknown-type') continue;
                const varName = document.getText(diag.range);
                if (!varName) continue;
                const fix = new vscode.CodeAction(
                    `Přidat anotaci typu pro '${varName}'`,
                    vscode.CodeActionKind.QuickFix
                );
                fix.edit = new vscode.WorkspaceEdit();
                fix.edit.insert(
                    document.uri,
                    new vscode.Position(diag.range.start.line, 0),
                    `//var ${varName} is \n`
                );
                fix.diagnostics = [diag];
                fix.isPreferred = true;
                actions.push(fix);
            }
            return actions;
        }
    }, { providedCodeActionKinds: [vscode.CodeActionKind.QuickFix] });
    context.subscriptions.push(providerCodeActions);

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
        const data = item.data;
        if (!data) return;  // placeholder item
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
            vscode.window.showErrorMessage('Modscript: nepodařilo se otevřít definici: ' + err.message);
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
        var specialVarRegex = /\/\/(?:var|global) (?<variable>[^\s,\(\\\/;]+) is (?<type>[^\s,\(\\\/;]+)/gm;
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
            while (specialMatches = specialVarRegex.exec(line)) {
                let found = false;
                for (let v of output) {
                    if (v.variable == specialMatches.groups.variable && ((_a = v === null || v === void 0 ? void 0 : v.range) === null || _a === void 0 ? void 0 : _a.contains(new vscode.Range(document.lineAt(i).range.start, document.lineAt(i).range.start)))) { //TODO: Also check Scope here once that is implemented
                        v.type = specialMatches.groups.type;
                        found = true;
                    }
                }
                if (!found) {
                    output.push(specialMatches.groups);
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
                    meathodReturnDescription: ""
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

        // Run diagnostics: mark variables whose type could not be inferred
        if (diagnosticCollection) {
            const diagnostics = [];
            const seen = new Set();
            for (const v of varList) {
                if ((!v.type || v.type === 'Unknown') && v.variable && !seen.has(v.variable) && typeof v.declarationLine === 'number') {
                    try {
                        const declLine = document.lineAt(v.declarationLine);
                        const idx = declLine.text.indexOf(v.variable);
                        const col = idx >= 0 ? idx : 0;
                        const end = col + v.variable.length;
                        const diag = new vscode.Diagnostic(
                            new vscode.Range(
                                new vscode.Position(v.declarationLine, col),
                                new vscode.Position(v.declarationLine, end)
                            ),
                            `Typ proměnné '${v.variable}' nebyl rozpoznán. Použijte '//var ${v.variable} is <Typ>' pro ruční určení.`,
                            vscode.DiagnosticSeverity.Hint
                        );
                        diag.code = 'unknown-type';
                        diagnostics.push(diag);
                        seen.add(v.variable);
                    } catch (e) { /* skip invalid lines */ }
                }
            }
            diagnosticCollection.set(document.uri, diagnostics);
        }

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
            if (seenF.has(f.meathodName)) continue; seenF.add(f.meathodName);
            items.push({ id: 'uf_' + f.meathodName, name: f.meathodName, kind: 'user-function', src: 'user',
                uri, line: f.declarationRange ? f.declarationRange.start.line : -1,
                desc: (f.meathodDescription && f.meathodDescription !== 'User Defined Function') ? f.meathodDescription : '',
                params: (f.meathodParms || []).map(pmap), ret: f.meathodReturn || 'Void', retDesc: f.meathodReturnDescription || '' });
        }
    }
    for (const [uri, clsList] of Object.entries(globalClasses)) {
        for (const cls of (clsList || [])) {
            if (seenC.has(cls.className)) continue; seenC.add(cls.className);
            items.push({ id: 'uc_' + cls.className, name: cls.className, kind: 'user-class', src: 'user',
                uri, line: cls.range ? cls.range.start.line : -1, desc: cls.classDescription || '',
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
`;
    const html = `
<div class="toolbar">
  <input id="search" type="text" placeholder="Hledat symbol, třídu, metodu...">
  <div class="filters">
    <span class="pill on" data-k="class">Třídy SBM</span>
    <span class="pill on" data-k="function">Funkce SBM</span>
    <span class="pill on" data-k="user-class">Vlastní třídy</span>
    <span class="pill on" data-k="user-function">Vlastní funkce</span>
  </div>
</div>
<div class="split">
  <div class="list-pane" id="LP"><p class="empty">Načítání...</p></div>
  <div class="detail" id="DP"><p class="empty">Vyberte položku ze seznamu.</p></div>
</div>`;
    const js = `
(function() {
var vsc = acquireVsCodeApi();
var ALL = [], FIL = [], SEL = -1;
var AK = { 'class': true, 'function': true, 'user-class': true, 'user-function': true };

document.querySelectorAll('.pill').forEach(function(el) {
  el.addEventListener('click', function() {
    var k = el.dataset.k;
    if (AK[k]) { AK[k] = false; el.className = 'pill off'; }
    else { AK[k] = true; el.className = 'pill on'; }
    render();
  });
});

var ICONS = { 'class': '[C]', 'function': '[F]', 'user-class': '[U]', 'user-function': '[D]' };
function ic(k) { return ICONS[k] || '[-]'; }
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function buildSig(it) {
  if (it.kind==='class'||it.kind==='user-class') return 'class ' + it.name + ' { ' + (it.methods||[]).length + ' metod, ' + (it.props||[]).length + ' vlastnosti }';
  var p = (it.params||[]).map(function(p){ return (p.opt?'[':'')+p.name+': '+p.type+(p.opt?']':''); }).join(', ');
  return (it.kind==='user-function'?'def ':'')+it.name+'('+p+'): '+(it.ret||'Void');
}

function render() {
  var q = document.getElementById('search').value.toLowerCase();
  FIL = ALL.filter(function(it) {
    if (!AK[it.kind]) return false;
    if (q && it.name.toLowerCase().indexOf(q) < 0 && (it.desc||'').toLowerCase().indexOf(q) < 0) return false;
    return true;
  });
  var LP = document.getElementById('LP');
  if (FIL.length === 0) { LP.innerHTML = '<p class="empty">Žádné výsledky.</p>'; return; }
  var h = '';
  for (var i = 0; i < FIL.length; i++) {
    var it = FIL[i], s = i === SEL ? ' sel' : '';
    h += '<div class="row' + s + '" data-idx="' + i + '">' +
         '<span class="ic">' + ic(it.kind) + '</span>' +
         '<span class="rname">' + esc(it.name) + '</span>' +
         (it.ret && it.ret !== 'Void' ? '<span class="rret">' + esc(it.ret) + '</span>' : '') +
         '</div>';
  }
  LP.innerHTML = h;
  if (SEL >= 0 && LP.children[SEL]) LP.children[SEL].scrollIntoView({block:'nearest'});
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

function sel(i) {
  SEL = i; render(); var it = FIL[i]; if (!it) return;
  var h = '<h2>' + esc(it.name) + '</h2>';
  h += '<span class="badge">' + (it.src==='sbm'?'SBM API':'Vlastní') + ' &middot; ' + esc(it.kind) + '</span>';
  h += '<div class="sig">' + esc(buildSig(it)) + '</div>';
  if (it.desc) h += '<div class="desc">' + esc(it.desc) + '</div>';
  if (it.uri && it.line >= 0) h += '<a class="navlink" data-uri="' + esc(it.uri) + '" data-line="' + it.line + '">&rarr; Přejít na definici</a>';
  if (it.params && it.params.length) {
    h += '<div class="sec">Parametry</div>';
    it.params.forEach(function(p) {
      h += '<div class="pr"><span class="pname">' + esc(p.name) + '</span><span class="ptype">' + esc(p.type) + '</span>' + (p.opt ? '<span class="popt">volitelný</span>' : '') + (p.desc ? ' &mdash; ' + esc(p.desc) : '') + '</div>';
    });
  }
  if (it.ret && it.ret !== 'Void') h += '<div class="sec">Vrací</div><div class="pr"><span class="ptype">' + esc(it.ret) + '</span>' + (it.retDesc ? ' &mdash; ' + esc(it.retDesc) : '') + '</div>';
  if (it.methods && it.methods.length) {
    h += '<div class="sec">Metody (' + it.methods.length + ')</div>';
    it.methods.forEach(function(m) {
      var mp = (m.params||[]).map(function(p){ return p.name+': '+p.type; }).join(', ');
      var nav = (it.uri && m.line >= 0) ? ' data-uri="' + esc(it.uri) + '" data-line="' + m.line + '"' : '';
      h += '<div class="mrow"' + nav + '><code><strong>' + esc(m.name) + '</strong>(' + esc(mp) + '): ' + esc(m.ret||'Void') + '</code>' + (m.desc ? '<br><span style="opacity:.6;font-size:11px">' + esc(m.desc) + '</span>' : '') + '</div>';
    });
  }
  if (it.props && it.props.length) {
    h += '<div class="sec">Vlastnosti (' + it.props.length + ')</div>';
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
    return '<!DOCTYPE html>\n<html lang="cs">\n<head>\n<meta charset="UTF-8">\n' +
        '<title>Modscript Reference</title>\n' +
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

    getChildren(element) {
        if (element) {
            // Children of a class item → its methods
            if (element.type === 'class' && this.showMethods) {
                const docUri = element.docUri;
                return (element.data.meathods || []).map(meth => {
                    const params = (meth.meathodParms || []).map(p => {
                        const t = Array.isArray(p.type) ? p.type.join('|') : (p.type || 'Variant');
                        return `${p.name}: ${t}`;
                    }).join(', ');
                    const item = new OutlineItem(
                        `${meth.meathodName}(${params})`,
                        vscode.TreeItemCollapsibleState.None,
                        'method',
                        meth,
                        meth.sourceUri || docUri
                    );
                    item.iconPath = new vscode.ThemeIcon('symbol-method');
                    item.description = meth.meathodReturn || '';
                    item.tooltip = meth.meathodDescription || '';
                    return item;
                });
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
            const placeholder = new vscode.TreeItem('Otevřete .tscm soubor');
            placeholder.iconPath = new vscode.ThemeIcon('info');
            return [placeholder];
        }

        const funcs = globalFuncs[uri] || [];
        const clses = globalClasses[uri] || [];
        const items = [];

        if (this.showFunctions) {
            for (const func of funcs) {
                const params = (func.meathodParms || []).map(p => {
                    const t = Array.isArray(p.type) ? p.type.join('|') : (p.type || 'Variant');
                    return `${p.name}: ${t}`;
                }).join(', ');
                const item = new OutlineItem(
                    `${func.meathodName}(${params})`,
                    vscode.TreeItemCollapsibleState.None,
                    'function',
                    func,
                    func.sourceUri || uri
                );
                item.iconPath = new vscode.ThemeIcon('symbol-function');
                item.description = func.meathodReturn || '';
                item.tooltip = func.meathodDescription ? func.meathodDescription.trim() : '';
                items.push(item);
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
                item.description = `${(cls.meathods || []).length} metod`;
                item.tooltip = cls.classDescription || cls.className;
                items.push(item);
            }
        }

        return items;
    }
}
//# sourceMappingURL=extension.js.map