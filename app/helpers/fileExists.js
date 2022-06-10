import {access} from 'node:fs/promises';

/**
 * Is file exists
 *
 * @param path
 * @returns {Promise<boolean>}
 */
export const fileExist = async (path) => {
    try {
        await access(path);
    } catch (e) {
        return false;
    }

    return true;
}
