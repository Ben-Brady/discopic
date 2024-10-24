const NAME_REGEX = /^[-_\p{L}\p{N}]{1,32}$/u;

export const validateCommandName = (name: string) => {
    if (!NAME_REGEX.test(name)) throw new Error(`Invalid Command Name: ${name}`);
};

export const validateCommandParameter = (name: string) => {
    if (!NAME_REGEX.test(name)) throw new Error(`Invalid Parameter Name: ${name}`);
};

export const validateEmbedFields = (fields: undefined | any[]) => {
    if (fields && fields.length > 25) throw new Error("Maximum 25 fields on an embed");
};

export const validateEmbedTitle = (title: undefined | string) => {
    if (title && title.length > 256) throw new Error("Maximum 256 characters on embed title");
};

export const validateEmbedDescription = (description: undefined | string) => {
    if (description && description.length > 4096) throw new Error("Maximum 4096 characters on embed description");
};
