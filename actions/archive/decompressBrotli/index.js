import {createBrotliDecompress} from "node:zlib";
import archive from "../index.js";

export default async function (session, args) {
    const archStrategy = createBrotliDecompress();
    await archive(session, args, archStrategy);
}
