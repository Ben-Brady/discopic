import { BaseChannel, Role, User } from "discord.js";
import { CommandFailedError } from "../commands/interaction.js";
import type { CommandParameters, ParameterType } from "../commands/types.js";
import type { CommandLogger } from "./index.js";

export const defaultCommandLogger: CommandLogger = ({ interaction, parameters, error }) => {
    const command = interaction.commandName;
    const server = interaction?.guild?.name ?? "DM";
    const name = interaction.user.displayName;
    const timestamp = new Date().toISOString();

    const parameterString = serializeParameters(parameters);

    if (!error) {
        console.log(`${timestamp}: /${command}${parameterString} executed by ${name} in ${server}`);
    } else if (error instanceof CommandFailedError) {
        const message = error.message.replace("\n", "\\n");
        console.error(`${timestamp}: /${command}${parameterString} failed due to "${message}" by ${name} in ${server}`);
    } else {
        console.error(`${timestamp}: /${command}${parameterString} failed by ${name} in ${server} due to`);
        console.error(error);
    }
};

const serializeParameters = (parameters: CommandParameters): string => {
    if (Object.keys(parameters).length === 0) return "";

    const parameterString = Object.entries(parameters)
        .map(([name, value]) => name + "=" + serializeParameter(value))
        .join(", ");

    return "?" + parameterString;
};

const serializeParameter = (value: ParameterType): string => {
    if (value === null) return "null";
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value.toString();

    if (value instanceof User) return `@${value.username}`;
    if (value instanceof Role) return `@${value.name}`;
    if (value instanceof BaseChannel) return `#${value.name}`;
    if ("attachment" in value) return `"${value.contentType}"(${value.name})`;

    return value?.toString() ?? "null";
};
