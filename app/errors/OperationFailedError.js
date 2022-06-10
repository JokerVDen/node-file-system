import error from "../messages/error.js";

export default class OperationFailedError extends Error {
    message = error.operationFailed;
}
