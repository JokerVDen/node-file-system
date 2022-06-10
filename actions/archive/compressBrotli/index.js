import {createBrotliCompress} from "node:zlib";
import archive from "../index.js";

export default async function (session, args) {
    const archStrategy = createBrotliCompress();
    await archive(session, args, archStrategy);
}
