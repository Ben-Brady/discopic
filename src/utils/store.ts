import { readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import crypto from "node:crypto";
import path from "path";

const generatePath = (key: string) => {
    const hash = crypto.createHash("sha256").update(key).digest("base64");
    const filename = `discopic-${hash.slice(0, 16)}`;
    return path.join(tmpdir(), filename);
};

export const getTempStore = (key: string): string | undefined => {
    const filepath = generatePath(key);
    try {
        return readFileSync(filepath).toString();
    } catch {
        return undefined;
    }
};

export const setTempStore = (key: string, value: string) => {
    const filepath = generatePath(key);
    writeFileSync(filepath, value);
};
