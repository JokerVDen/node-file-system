import * as path from "node:path";
import * as fs from "node:fs/promises";
import parsePaths from "../../../app/helpers/parsePaths.js";
import OperationFailedError from "../../../app/errors/OperationFailedError.js";

export default async function (session, args) {
    try {
        const argPaths = parsePaths(args.join(' '), 1);

        let to = argPaths[0];

        if (to.startsWith('"') && to.endsWith('"')) {
            to = to.substring(1,to.length - 1);
        }

        const newPath = path.resolve(session.path, to);
        await fs.access(newPath);
        session.path = newPath;
    } catch (e) {
        throw new OperationFailedError();
    }
}
