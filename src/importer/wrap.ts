import { start } from 'repl';
import * as vscode from 'vscode';
import { FileType, snippet } from './_util';

export function wrapWithExporterMarkers(outputChannel: vscode.OutputChannel) {
    const textEditor = vscode.window.activeTextEditor;
    if (textEditor === undefined) { return; }

    const timestamp = new Date();
    const startLine = textEditor.selection.start.line,
        endLine = textEditor.selection.end.line,
        endChar = textEditor.selection.end.character;

    const lines = getLineRange(startLine, endLine, endChar);

    outputChannel.appendLine(`${timestamp}: start ${startLine}, end ${endLine}`);

    if (!isRangeValid(startLine, endLine, textEditor)) { return; }

    let text = textEditor.document.getText(lines);
    if (text === "") { return; }
    if (!text.endsWith("\n")) { text += "\n"; }

    const fileExtension = textEditor.document.fileName.split('.').pop();;

    outputChannel.appendLine(`${timestamp}: ${text}`);

    textEditor.insertSnippet(snippet(fileExtension as FileType, "ExporterMarker", text, "Wrap"), lines);
}

function getLineRange(startLine: number, endLine: number, endChar: number): vscode.Range {
    if (startLine === endLine) { return new vscode.Range(new vscode.Position(startLine, 0), new vscode.Position(endLine + 1, 0)); }
    if (endLine > startLine && endChar === 0) { return new vscode.Range(new vscode.Position(startLine, 0), new vscode.Position(endLine, 0)); }

    return new vscode.Range(new vscode.Position(startLine, 0), new vscode.Position(endLine + 1, 0));
}

function isRangeValid(startLine: number, endLine: number, textEditor: vscode.TextEditor): boolean {
    // if (startLine === 0 && endLine === 0 ) { return false; }
    if (startLine > endLine) { return false; }

    return true;
}
