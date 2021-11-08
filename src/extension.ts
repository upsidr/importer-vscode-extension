import * as vscode from 'vscode';
import { foldImported } from './importer/fold';
import { purge } from './importer/purge';
import { update } from './importer/update';
import { wrapWithExporterMarkers, wrapWithImporterMarkers } from './importer/wrap';

export async function activate(context: vscode.ExtensionContext) {
	const outputChannel = vscode.window.createOutputChannel("Importer");

	let updateCmd = vscode.commands.registerCommand('importer-vscode.update', () => update(outputChannel));
	let purgeCmd = vscode.commands.registerCommand('importer-vscode.purge', () => purge(outputChannel));

	let wrapWithImproterCmd = vscode.commands.registerCommand('importer-vscode.wrap-with-importer',
		() => wrapWithImporterMarkers(outputChannel));
	let wrapWithExproterCmd = vscode.commands.registerCommand('importer-vscode.wrap-with-exporter',
		() => wrapWithExporterMarkers(outputChannel));

	// TODO: Add fold setup
	// let foldImportedCmd = vscode.commands.registerCommand('importer-vscode.fold-imported', foldImported);

	context.subscriptions.push(
		updateCmd,
		purgeCmd,
		wrapWithImproterCmd,
		wrapWithExproterCmd,
		// foldImportedCmd,
	);
}

export function deactivate() { }