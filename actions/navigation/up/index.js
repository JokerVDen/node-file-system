import * as path from "node:path";
import OperationFailedError from "../../../app/errors/OperationFailedError.js";

export default async function (session, args) {
    if (args && args.length > 0) {
        throw new OperationFailedError();
    }

    try {
        session.path = path.resolve(session.path, '..');
    } catch (e) {
        throw new OperationFailedError();
    }
}
