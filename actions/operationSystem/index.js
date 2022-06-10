import os from "node:os";
import OperationFailedError from "../../app/errors/OperationFailedError.js";

export default async function (session, args) {
    if ((args && args.length !== 1)) {
        throw new OperationFailedError();
    }

    try {
        let result = '';

        switch (args[0]) {
            case '--EOL':
                result = os.EOL;
                break;
            case '--cpus':
                result = os.cpus();
                break;
            case '--homedir':
                result = os.homedir();
                break;
            case '--username':
                result = os.userInfo().username;
                break;
            case '--architecture':
                result = os.arch();
                break;
            default:
                throw new Error();
        }

        console.log(result);
    } catch (e) {
        throw new OperationFailedError();
    }
}
