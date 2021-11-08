import * as vscode from 'vscode';
import { FileType, MarkerType } from './_util';

export const wrapWithImporterMarkers =
    (outputChannel: vscode.OutputChannel) => wrapWithMarkers(outputChannel, "ImporterMarker");
export const wrapWithExporterMarkers =
    (outputChannel: vscode.OutputChannel) => wrapWithMarkers(outputChannel, "ExporterMarker");

function wrapWithMarkers(outputChannel: vscode.OutputChannel, markerType: MarkerType) {
    const textEditor = vscode.window.activeTextEditor;
    if (textEditor === undefined) { return; }

    const timestamp = new Date();
    const startLine = textEditor.selection.start.line,
        endLine = textEditor.selection.end.line,
        lines = new vscode.Range(new vscode.Position(startLine, 0), new vscode.Position(endLine + 1, 0));

    outputChannel.appendLine(`${timestamp}: start ${startLine}, end ${endLine}`);

    if (!isRangeValid(startLine, endLine, textEditor)) { return; }

    outputChannel.appendLine(`${timestamp}: start ${startLine}, end ${endLine}`);

    let text = textEditor.document.getText(lines);
    if (text === "") { return; }
    if (!text.endsWith("\n")) { text += "\n"; }

    const fileType = textEditor.document.languageId;

    outputChannel.appendLine(`${timestamp}: ${text}`);

    textEditor.insertSnippet(snippet(fileType as FileType, markerType, text), lines);
}

function snippet(fileType: FileType, markerType: MarkerType, wrappedText: string): vscode.SnippetString {
    // TODO: Some text blocks are hard coded here. We should be able to have 
    //       more streamlined setup with code reuse. We may actually be able to
    //       use Importer to pull in some file content when Importer supports
    //       JavaScript / TypeScript.

    const head = (markerType: MarkerType) => {
        switch (markerType) {
            case "ImporterMarker":
                return "import";
            case "ExporterMarker":
                return "export";
        }
    };
    const options = (markerType: MarkerType) => {
        switch (markerType) {
            case "ImporterMarker":
                return "from: ${2:URL or /path/to/file}#${3:lineRange or exporterMarker} ";
            case "ExporterMarker":
                return "";
        }
    };

    // Quite a bit of assumptions being made, and is going to require more
    // extensive testing to ensure all the markers are correctly created for
    // any code.
    let tmpl: string;
    switch (fileType) {
        case "yaml":
            const precedingWhitespace = wrappedText.search(/\S|$/);
            tmpl =
                `${' '.repeat(precedingWhitespace)}# == ${head(markerType)}: \${1:name} / begin ${options(markerType)}==\n` +
                `${wrappedText}` +
                `${' '.repeat(precedingWhitespace)}# == ${head(markerType)}: \${1:name} / end ==\n`;
            return new vscode.SnippetString(tmpl);
        case "markdown":
            tmpl =
                `<!-- == ${head(markerType)}: \${1:name} / begin == -->\n` +
                `${wrappedText}` +
                `<!-- == ${head(markerType)}: \${1:name} / end == -->\n`;
            return new vscode.SnippetString(tmpl);
    }
}

function isRangeValid(startLine: number, endLine: number, textEditor: vscode.TextEditor): boolean {
    if (startLine === 0 || endLine === 0) { return false; }
    if (startLine > endLine) { return false; }

    return true;
}
