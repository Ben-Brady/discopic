import { BaseChannel, CommandInteraction, Role, User } from "discord.js";
import type { Command, CommandParameters, ParameterType } from "./command.js";

export type CommandLogger = (config: {
    command: Command;
    interaction: CommandInteraction;
    parameters: CommandParameters;
    error?: unknown;
}) => void;

export const defaultCommandLogger: CommandLogger = ({ command, interaction, parameters, error }) => {
    const timestamp = new Date().toISOString();
    const username = interaction.user.displayName;
    const server = interaction?.guild?.name ?? "DM";

    const parameterString = serializeParameters(parameters);

    const path = command.group ? `/${command.group.name}/${command.name}` : `/${command.name}`;
    if (!error) {
        console.log(`${timestamp}: ${path}${parameterString} executed by ${username} in ${server}`);
    } else {
        console.error(`${timestamp}: ${path}${parameterString} failed by ${username} in ${server}`);
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
