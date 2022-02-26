import * as vscode from 'vscode';
import { foldImported } from './importer/fold';
import { insertImporterMarkers } from './importer/insert';
import { purge } from './importer/purge';
import { update } from './importer/update';
import { wrapWithExporterMarkers } from './importer/wrap';

export async function activate(context: vscode.ExtensionContext) {
	const outputChannel = vscode.window.createOutputChannel("Importer");

	const updateCmd = vscode.commands.registerCommand('importer-vscode.update', () => update(outputChannel));
	const purgeCmd = vscode.commands.registerCommand('importer-vscode.purge', () => purge(outputChannel));

	const insertImproterMarkerCmd = vscode.commands.registerCommand('importer-vscode.insert-importer-marker',
		() => insertImporterMarkers(outputChannel));
	const wrapWithExproterCmd = vscode.commands.registerCommand('importer-vscode.wrap-with-exporter',
		() => wrapWithExporterMarkers(outputChannel));

	// TODO: Add fold setup
	// let foldImportedCmd = vscode.commands.registerCommand('importer-vscode.fold-imported', foldImported);

	context.subscriptions.push(
		updateCmd,
		purgeCmd,
		insertImproterMarkerCmd,
		wrapWithExproterCmd,
		// foldImportedCmd,
	);
}

export function deactivate() { }
