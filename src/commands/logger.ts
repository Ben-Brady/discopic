import { BaseChannel, CommandInteraction, Role, User } from "discord.js";
import type { CommandParameters, ParameterType } from "./command.js";

export type CommandLogger = (config: {
    interaction: CommandInteraction;
    parameters: CommandParameters;
    error?: unknown;
}) => void;

export const defaultCommandLogger: CommandLogger = ({ interaction, parameters, error }) => {
    const command = interaction.commandName;
    const server = interaction?.guild?.name ?? "DM";
    const name = interaction.user.displayName;
    const timestamp = new Date().toISOString();

    const parameterString = serializeParameters(parameters);

    if (!error) {
        console.log(`${timestamp}: /${command}${parameterString} executed by ${name} in ${server}`);
    } else {
        console.error(`${timestamp}: /${command}${parameterString} failed by ${name} in ${server}`);
        console.error(error);
    }
};

const serializeParameters = (parameters: CommandParameters): string => {
    if (Object.keys(parameters).length === 0) return "";

    const parameterString = Object.entries(parameters)
        .map(([name, value]) => name + "=" + serializeParameter(value))
        .join("&");

    return "?" + parameterString;
};

const serializeParameter = (value: ParameterType): string => {
    if (value === null || value === undefined) return "null";
    if (typeof value === "number" || typeof value === "boolean") return value.toString();
    if (typeof value === "string") return `"${value}"`;

    if (value instanceof User) return `@${value.username}`;
    if (value instanceof Role) return `@${value.name}`;
    if (value instanceof BaseChannel) return `#${value.name}`;
    if ("attachment" in value) return `"${value.contentType}"(${value.name})`;

    return value?.toString() ?? "null";
};
