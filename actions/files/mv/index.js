import * as path from "node:path";
import parsePaths from "../../../app/helpers/parsePaths.js";
import fs from "node:fs/promises";
import OperationFailedError from "../../../app/errors/OperationFailedError.js";

export default async function (session, args) {
    try {
        const argPaths = parsePaths(args.join(' '), 2);

        const from = path.resolve(session.path, argPaths[0]);
        const to = path.resolve(session.path, argPaths[1]);

        await fs.cp(from, to, {recursive: true, errorOnExist: true, force: false});
        await fs.rm(from);
    } catch (e) {
        throw new OperationFailedError();
    }
}
