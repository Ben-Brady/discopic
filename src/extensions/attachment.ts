import type { Attachment } from "discord.js";

export type ExtendedAttachment = {
    downloadBlob: () => Promise<Blob>;
    downloadText: () => Promise<string>;
} & Attachment;

export const createExtendedAttachment = (
    attachment: Attachment,
): ExtendedAttachment => {
    const downloadBlob = async () => {
        const r = await fetch(attachment.proxyURL);
        return await r.blob();
    };

    const downloadText = async () => {
        const r = await fetch(attachment.proxyURL);
        return await r.text();
    };

    return {
        downloadBlob,
        downloadText,
        ...Object(attachment),
    };
};
