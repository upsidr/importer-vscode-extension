import * as vscode from 'vscode';

export function foldImported() {

}

// eslint-disable-next-line @typescript-eslint/naming-convention
class test implements vscode.FoldingRangeProvider {
    onDidChangeFoldingRanges?: vscode.Event<void> | undefined;
    provideFoldingRanges(document: vscode.TextDocument, context: vscode.FoldingContext, token: vscode.CancellationToken): vscode.ProviderResult<vscode.FoldingRange[]> {
        throw new Error('Method not implemented.');
    }
}