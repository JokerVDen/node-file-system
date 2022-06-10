import ParsePathError from "../errors/ParsePathError.js";

/**
 * Parse path from string
 *
 * @param string
 * @param needArgCount
 * @returns {*[]}
 */
export default (string, needArgCount = -1) => {
    let inQuotes = false, parsedPath = '', results = [];

    for (const index in string) {
        const char = string[index];
        if (char === '"') {
            inQuotes = !inQuotes;
            if (!inQuotes && parsedPath.length > 0) {
                results.push(parsedPath);
                parsedPath = '';
                continue;
            }
            continue;
        } else if (!inQuotes && char === ' ' && parsedPath.length) {
            results.push(parsedPath);
            parsedPath = '';
            continue;
        } else if (!inQuotes && char === ' ') {
            continue;
        }

        parsedPath += char;
    }

    if (inQuotes) {
        throw new ParsePathError('Wrong format');
    }

    if (parsedPath.length > 0 && !inQuotes) {
        results.push(parsedPath);
    }

    if (needArgCount > 0 && results.length !== needArgCount) {
        throw new Error();
    }

    return results;
}
