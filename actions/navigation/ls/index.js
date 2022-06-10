import * as fs from "node:fs/promises";
import OperationFailedError from "../../../app/errors/OperationFailedError.js";

export default async function (session, args) {
    if (args && args.length > 0) {
        throw new OperationFailedError()
    }

    try {
        const dirList = await fs.readdir(session.path, {withFileTypes: true});
        const result = dirList
            .sort((dirent, prevDirent) => dirent.name > prevDirent.name ? 1 : -1)
            .map(dirent => (dirent.isDirectory() ? 'DIR' : 'FIL') + ` ${dirent.name}`);
        console.log(result.join('\n'));
    } catch (e) {
        throw new OperationFailedError();
    }
}
