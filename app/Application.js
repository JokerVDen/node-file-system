import path from "node:path";
import os from "node:os";
import Auth from "./Auth.js";
import Router from "./Router.js";

/**
 * Application class
 */
class Application {
    /**
     * Session object
     *
     * @type {null|Object}
     */
    #session = null;

    constructor() {
        this.prepareSession();
    }

    /**
     * Prepare session object
     */
    prepareSession() {
        const auth = new Auth();
        this.#session = {
            user: auth.login(),
            path: path.resolve(os.homedir()),
        }
    }

    /**
     * Run application
     *
     * @param line
     * @returns {Promise<void>}
     */
    async run(line) {
        const {action, args} = Application.#prepareParams(line);

        const actionRunner = new Router();
        await actionRunner.run(action, this.#session, args);
    }

    /**
     * Prepare action and args
     *
     * @param line
     * @returns {{args: *, action: unknown}}
     */
    static #prepareParams(line) {
        const args = line.split(' ');
        const action = args.shift();

        return {
            action,
            args,
        }
    }

    /**
     * Get session object
     *
     * @returns {Object|null}
     */
    getSession() {
        return this.#session;
    }
}

export default Application;
