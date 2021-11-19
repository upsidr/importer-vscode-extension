import * as vscode from 'vscode';
import { checkImporerInstalled, execShell } from './_util';

export async function update(outputChannel: vscode.OutputChannel) {
    // Validation
    const isImporterAvailable = await checkImporerInstalled();
    if (!isImporterAvailable) {
        vscode.window.showErrorMessage("Error: This extension requires Importer to be on your PATH.");
        return;
    }

    const fileName = vscode.window.activeTextEditor?.document.fileName;
    const timestamp = new Date();

    let result: string;
    try {
        vscode.window.activeTextEditor?.document.save();
        result = await execShell(`importer update ${fileName}`);
    } catch (e) {
        const errorDetail = e as string;
        outputChannel.appendLine(`${timestamp}: ${errorDetail}`);
        vscode.window.showErrorMessage(`ERROR: failed to call \`importer update\` against ${fileName}`);
        return;
    }

    // importer update does not return anything, and thus result is not being used here.

    outputChannel.appendLine(`${timestamp}: 'importer update' has been run against '${fileName}'`);
}