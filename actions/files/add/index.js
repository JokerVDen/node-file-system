import * as path from "node:path";
import * as fs from "node:fs";
import parsePaths from "../../../app/helpers/parsePaths.js";
import {fileExist} from "../../../app/helpers/fileExists.js";
import OperationFailedError from "../../../app/errors/OperationFailedError.js";

export default async function (session, args) {
    try {
        const argPaths = parsePaths(args.join(' '), 1);

        const filePath = path.resolve(session.path, argPaths[0]);

        if (await fileExist(filePath)) {
            throw new Error('File exist');
        }

        fs.closeSync(fs.openSync(filePath, 'w'))
    } catch (e) {
        throw new OperationFailedError;
    }
}
