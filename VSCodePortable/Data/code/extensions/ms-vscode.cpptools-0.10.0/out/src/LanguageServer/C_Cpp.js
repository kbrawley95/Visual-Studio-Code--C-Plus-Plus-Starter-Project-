'use strict';
var path = require('path');
var vscode = require('vscode');
var vscode_languageclient_1 = require('vscode-languageclient');
var util = require('../common');
var Telemetry = require('../telemetry');
var C_Cpp_DebugProtocol = require('./C_Cpp_DebugProtocol');
var C_Cpp_ConfigurationProperties = require('./C_Cpp_ConfigurationProperties');
var C_Cpp_Feedback = require('./C_Cpp_Feedback');
var ShutdownRequest_type = {
    get method() { return "shutdown"; }
};
var ExitRequest_type = {
    get method() { return "exit"; }
};
var ActiveDocumentChange_type = {
    get method() { return "cpp/activeDocumentChange"; }
};
var TextEditorSelectionChange_type = {
    get method() { return "cpp/textEditorSelectionChange"; }
};
var FormatCausesNoChanges_type = {
    get method() { return "cpp/formatCausesNoChanges"; }
};
var AutocompleteChange_Type = { get method() { return 'cpp_autocomplete/change'; } };
var statusBarMessageTimeout = 3000;
var activeDocument;
function activate(context) {
    var serverModule = getExtensionFilenamePath();
    var clangformatModule = getClangFormatFilenamePath();
    var serverOptions = {
        run: { command: serverModule },
        debug: { command: serverModule }
    };
    var bugUserSettings = new C_Cpp_Feedback.FeedbackState(context);
    var con = vscode.workspace.getConfiguration("C_Cpp");
    var editor = vscode.workspace.getConfiguration("editor");
    var excludeFiles = vscode.workspace.getConfiguration("files.exclude");
    var excludeSearch = vscode.workspace.getConfiguration("search.exclude");
    var fileAssociations = vscode.workspace.getConfiguration("files.associations");
    var fileAssociationsList = ["*.cpp", "*.cc", "*.cxx", "*.hpp", "*.hh", "*.hxx", "*.h", "*.mm", "*.ino", "*.inl"];
    var clientOptions = {
        documentSelector: ['cpp', "c"],
        synchronize: {
            configurationSection: ['C_Cpp', 'files', 'search']
        },
        initializationOptions: {
            clang_format_path: con.get("clang_format_path"),
            clang_format_style: con.get("clang_format_style"),
            clang_format_fallackStyle: con.get("clang_format_fallackStyle"),
            clang_format_sortIncludes: con.get("clang_format_sortIncludes"),
            clang_format_formatOnSave: con.get("clang_format_formatOnSave"),
            formatting: con.get("formatting"),
            extension_path: context.extensionPath,
            exclude_files: excludeFiles,
            exclude_search: excludeSearch,
            bug_user_count: bugUserSettings.getBugUserCount(),
            bug_user_count_edit: bugUserSettings.getBugUserEditCount(),
            storage_path: context.storagePath,
            tab_size: editor.get("tabSize"),
        }
    };
    var languageClient = new vscode_languageclient_1.LanguageClient('C/Cpp Language Server', serverOptions, clientOptions);
    C_Cpp_DebugProtocol.setupDebugProtocolHandler(languageClient);
    C_Cpp_Feedback.setupFeedbackHandler(context, languageClient);
    context.subscriptions.push(C_Cpp_ConfigurationProperties.setupConfigurationProperties(context, languageClient));
    context.subscriptions.push(languageClient.start());
    languageClient.onNotification(AutocompleteChange_Type, function () {
    });
    this.registeredCommand = vscode.commands.registerCommand('C_Cpp.UnloadLanguageServer', function () {
        languageClient.sendRequest(ShutdownRequest_type, null).then(function () {
            return languageClient.sendNotification(ExitRequest_type);
        });
    });
    var formattedDocToSave = null;
    vscode.window.onDidChangeActiveTextEditor(function (editor) {
        var activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor || (activeEditor.document.languageId != "cpp" && activeEditor.document.languageId != "c")) {
            activeDocument = "";
            return;
        }
        else {
            activeDocument = editor.document.uri.toString();
        }
        var activeDoc = vscode_languageclient_1.Code2Protocol.asTextDocumentIdentifier(editor.document);
        languageClient.sendNotification(ActiveDocumentChange_type, activeDoc);
        languageClient.sendNotification(TextEditorSelectionChange_type, editor.selection.start);
    });
    vscode.window.onDidChangeTextEditorSelection(function (event) {
        if (event.textEditor.document.uri != vscode.window.activeTextEditor.document.uri || (event.textEditor.document.languageId != "cpp" && event.textEditor.document.languageId != "c"))
            return;
        if (activeDocument != event.textEditor.document.uri.toString()) {
            activeDocument = event.textEditor.document.uri.toString();
            var activeDoc = vscode_languageclient_1.Code2Protocol.asTextDocumentIdentifier(event.textEditor.document);
            languageClient.sendNotification(ActiveDocumentChange_type, activeDoc);
        }
        languageClient.sendNotification(TextEditorSelectionChange_type, event.selections[0].start);
    });
    vscode.workspace.onDidSaveTextDocument(function (doc) {
        if (doc != vscode.window.activeTextEditor.document || (doc.languageId != "cpp" && doc.languageId != "c"))
            return;
        if (formattedDocToSave != null) {
            formattedDocToSave = null;
        }
        else if (vscode.workspace.getConfiguration("C_Cpp").get("clang_format_formatOnSave")) {
            formattedDocToSave = doc;
            vscode.commands.executeCommand("editor.action.format");
        }
    });
    languageClient.onNotification(FormatCausesNoChanges_type, function () {
        if (formattedDocToSave != null)
            formattedDocToSave = null;
    });
    vscode.workspace.onDidChangeTextDocument(function () {
        if (formattedDocToSave != null)
            formattedDocToSave.save();
    });
    Telemetry.logLanguageServerEvent("LanguageServerLaunched");
    languageClient.onNotification(Telemetry.LogTelemetry_type, function (notificationBody) {
        Telemetry.logLanguageServerEvent(notificationBody.event, notificationBody.properties, notificationBody.metrics);
    });
}
exports.activate = activate;
function deactivate() {
    this.registeredCommand.dispose();
    Telemetry.logLanguageServerEvent("LanguageServerShutdown");
}
exports.deactivate = deactivate;
function getExtensionFilenamePath() {
    var extensionProcessName = 'Microsoft.VSCode.CPP.Extension';
    var plat = process.platform;
    if (plat == 'linux') {
        extensionProcessName += '.linux';
    }
    else if (plat == 'darwin') {
        extensionProcessName += '.darwin';
    }
    else if (plat == 'win32') {
        extensionProcessName += '.exe';
    }
    else {
        throw "Invalid Platform";
    }
    return path.resolve(util.getExtensionPath(), "bin", extensionProcessName);
}
function getClangFormatFilenamePath() {
    var clangformatProcessName = "clang-format";
    var plat = process.platform;
    if (plat == 'linux') {
        ;
    }
    else if (plat == 'darwin') {
        clangformatProcessName += '.darwin';
    }
    else if (plat == 'win32') {
        clangformatProcessName += '.exe';
    }
    else {
        throw "Invalid Platform";
    }
    return path.resolve(util.getExtensionPath(), "LLVM", "bin", clangformatProcessName);
}
//# sourceMappingURL=C_Cpp.js.map