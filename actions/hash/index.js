import parsePaths from "../../app/helpers/parsePaths.js";
import {readFile} from "node:fs/promises";
import path from "node:path";
import OperationFailedError from "../../app/errors/OperationFailedError.js";

export default async function (session, args) {
    try {
        const filePath = parsePaths(args.join(' '), 1).pop();
        const fullPath = path.resolve(session.path, filePath);
        const content = await readFile(fullPath);

        const { createHash } = await import('crypto');

        const hex = createHash('sha256')
            .update(content)
            .digest('hex');

        console.log(hex);
    } catch (e) {
        throw new OperationFailedError();
    }
}
