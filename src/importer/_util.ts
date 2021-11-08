import * as cp from "child_process";

type FileType =
    | "yaml"
    | "markdown";

type MarkerType =
    | "ImporterMarker"
    | "ExporterMarker";

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