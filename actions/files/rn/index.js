import * as path from "node:path";
import parsePaths from "../../../app/helpers/parsePaths.js";
import fs from "node:fs/promises";
import {fileExist} from "../../../app/helpers/fileExists.js";
import OperationFailedError from "../../../app/errors/OperationFailedError.js";

export default async function (session, args) {
    try {
        const argPaths = parsePaths(args.join(' '), 2);

        const from = path.resolve(session.path, argPaths[0]);
        const to = path.resolve(session.path, argPaths[1]);

        await fs.access(from);

        if (await fileExist(to)) {
            throw new Error('Destination file exists!');
        }

        await fs.rename(from, to);
    } catch (e) {
        throw new OperationFailedError();
    }
}
