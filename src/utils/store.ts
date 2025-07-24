import { readFileSync, writeFileSync } from "fs";
import crypto from "node:crypto";
import path from "path";
import { existsSync, mkdirSync } from "node:fs";

const TMP_DIR = ".discopic";

const generatePath = (key: string) => {
    const hash = crypto.createHash("sha256").update(key).digest("base64");
    const filename = `discopic-${hash.slice(0, 16)}`;
    return path.join(TMP_DIR, filename);
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

    if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true });
    writeFileSync(filepath, value);
};
