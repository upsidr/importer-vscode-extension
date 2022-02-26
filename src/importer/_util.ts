import * as cp from "child_process";
import * as vscode from 'vscode';

type FileType =
    | "yaml"
    | "yml"
    | "md";

type MarkerType =
    | "ImporterMarker"
    | "ExporterMarker";

type Logic =
    | "Insert"
    | "Wrap";

export { FileType, MarkerType };


export const execShell = (cmd: string) =>
    new Promise<string>((resolve, reject) => {
        cp.exec(cmd, (err, out) => {
            if (err) {
                return reject(err);
            }
            return resolve(out);
        });
    });

export const checkImporerInstalled = () => execShell("importer version").then(() => true, _ => false);

export function snippet(fileType: FileType, markerType: MarkerType, wrappedText: string, logic: Logic): vscode.SnippetString {
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
        case "yml":
            const precedingWhitespace = wrappedText.search(/\S|$/);
            tmpl =
                `${' '.repeat(precedingWhitespace)}# == ${head(markerType)}: \${1:name} / begin ${options(markerType)}==\n` +
                `${logic === "Wrap" ? wrappedText : ""}` +
                `${' '.repeat(precedingWhitespace)}# == ${head(markerType)}: \${1:name} / end ==\n`;
            return new vscode.SnippetString(tmpl);
        case "md":
            tmpl =
                `<!-- == ${head(markerType)}: \${1:name} / begin == -->\n` +
                `${logic === "Wrap" ? wrappedText : ""}` +
                `<!-- == ${head(markerType)}: \${1:name} / end == -->\n`;
            return new vscode.SnippetString(tmpl);
    }
}
