import * as path from "node:path";
import * as fs from "node:fs";
import error from "../../../app/messages/error.js";
import {stdout} from "node:process";
import parsePaths from "../../../app/helpers/parsePaths.js";
import OperationFailedError from "../../../app/errors/OperationFailedError.js";

export default async function (session, args) {
    try {
        const argPaths = parsePaths(args.join(' '), 1);

        const filePath = path.resolve(session.path, argPaths[0]);

        await new Promise((resolve, reject) => {
            const stream = fs.createReadStream(filePath);
            stream.pipe(stdout);
            stream.on('end', () => {
                console.log();
                resolve();
            });
            stream.on('error', e => reject(e))
        }).catch(() => {throw new Error()});
    } catch (e) {
        throw new OperationFailedError;
    }
}
