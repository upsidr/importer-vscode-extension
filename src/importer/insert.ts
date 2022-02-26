import * as vscode from 'vscode';
import { FileType, snippet } from './_util';

export function insertImporterMarkers(outputChannel: vscode.OutputChannel) {
    const textEditor = vscode.window.activeTextEditor;
    if (textEditor === undefined) { return; }

    const timestamp = new Date();
    const currentLine = textEditor.selection.start.line;

    outputChannel.appendLine(`${timestamp}: current line ${currentLine}`);

    const current = new vscode.Range(new vscode.Position(currentLine, 0), new vscode.Position(currentLine + 1, 0));
    let currentText = textEditor.document.getText(current);

    const fileExtension = textEditor.document.fileName.split('.').pop();;

    textEditor.insertSnippet(snippet(fileExtension as FileType, "ImporterMarker", currentText, "Insert"), textEditor.selection.start);
}
