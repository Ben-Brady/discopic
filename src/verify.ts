const COMMAND_NAME_REGEX = /^[-_\p{L}\p{N}]{1,32}$/u;

export const validateCommandName = (name: string) => {
    if (!COMMAND_NAME_REGEX.test(name))
        throw new Error(`Invalid Command Name: ${name}`);
};

export const validateCommandParameter = (name: string) => {
    if (!COMMAND_NAME_REGEX.test(name))
        throw new Error(`Invalid Parameter Name: ${name}`);
};
