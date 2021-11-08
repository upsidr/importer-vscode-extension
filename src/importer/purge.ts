import * as vscode from 'vscode';
import { checkImporerInstalled, execShell } from './_util';

export async function purge(outputChannel: vscode.OutputChannel) {
    // Validation
    const isImporterAvailable = await checkImporerInstalled();
    if (!isImporterAvailable) {
        vscode.window.showErrorMessage("Error: This extension requires Importer to be on your PATH.");
        return;
    }

    const fileName = vscode.window.activeTextEditor?.document.fileName;
    const timestamp = new Date();;

    let result: string;
    try {
        result = await execShell(`importer purge ${fileName}`);
    } catch (e) {
        const errorDetail = e as string;
        outputChannel.appendLine(`${timestamp}: ${errorDetail}`);
        vscode.window.showErrorMessage(errorDetail);
        return;
    }

    // importer purge does not return anything, and thus result is not being used here.
    
    outputChannel.appendLine(`${timestamp}: 'importer purge' has been run against '${fileName}'`);
}