import ActionNotFound from "../app/errors/ActionNotFound.js";

/**
 * Router class
 */
class Router {

    /**
     * Routes
     *
     * @type {Object}
     */
    #routes = {
        cd: "../actions/navigation/cd/index.js",
        up: "../actions/navigation/up/index.js",
        cat: "../actions/files/cat/index.js",
        ls: "../actions/navigation/ls/index.js",
        add: "../actions/files/add/index.js",
        rn: "../actions/files/rn/index.js",
        cp: "../actions/files/cp/index.js",
        mv: "../actions/files/mv/index.js",
        rm: "../actions/files/rm/index.js",
        os: '../actions/operationSystem/index.js',
        hash: '../actions/hash/index.js',
        compress: '../actions/archive/compressBrotli/index.js',
        decompress: '../actions/archive/decompressBrotli/index.js',
    };

    /**
     * Run routing
     *
     * @param action
     * @param session
     * @param args
     * @returns {Promise<void>}
     */
    async run(action, session, args) {
        if (!this.#actionExist(action)) {
            throw new ActionNotFound();
        }

        await this.#runAction(action, session, args);
    }

    /**
     * Check action for existence
     *
     * @param action
     * @returns {boolean}
     */
    #actionExist(action) {
        return this.#routes.hasOwnProperty(action);
    }

    /**
     * Run action
     *
     * @param action
     * @param session
     * @param args
     * @returns {Promise<void>}
     */
    async #runAction(action, session, args) {
        const {default: actionFn} = await import(this.#routes[action]);
        await actionFn(session, args);
    }
}

export default Router;
