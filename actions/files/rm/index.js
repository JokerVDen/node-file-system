import * as path from "node:path";
import parsePaths from "../../../app/helpers/parsePaths.js";
import fs from "node:fs/promises";
import OperationFailedError from "../../../app/errors/OperationFailedError.js";

export default async function (session, args) {
    try {
        const argPaths = parsePaths(args.join(' '), 1);

        const filePath = path.resolve(session.path, argPaths[0]);

        await fs.rm(filePath);
    } catch (e) {
        throw new OperationFailedError();
    }
}
