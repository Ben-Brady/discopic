import {
    ApplicationCommandOptionType,
    type AutocompleteInteraction,
    type ChatInputCommandInteraction,
    type CommandInteraction,
} from "discord.js";
import type { Command, CommandParameters, InferParameterObject, Parameter } from "../commands/types.js";
import { createExtendedAttachment } from "../extensions/attachment.js";
import type { CommandLogger } from "../logging/index.js";
import { createCommandContext } from "../extensions/context/command.js";

const commandLookup = new Map<string, Command>();

export const registerCommand = (command: Command) => {
    commandLookup.set(command.name, command);
};

export class CommandFailedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CommandFailedError";
    }
}

export async function runCommandInteraction(
    interaction: ChatInputCommandInteraction,
    logger: CommandLogger | undefined,
) {
    const command = commandLookup.get(interaction.commandName);
    if (!command) {
        throw new Error(`/${interaction.commandName} not found`);
    }

    const parameters = generateCommandCallbackParameters(interaction, command.parameters ?? {});
    const ctx = createCommandContext(interaction);

    try {
        await command.execute({ interaction, parameters, ctx });
        await logger?.({ interaction, parameters, error: undefined });
    } catch (error) {
        if (error instanceof Error) await handleCommandError({ interaction, parameters, error, logger });
        throw error;
    }
}

const handleCommandError = async ({
    interaction,
    parameters,
    error,
    logger,
}: {
    interaction: ChatInputCommandInteraction;
    parameters: CommandParameters;
    error: Error | undefined;
    logger: CommandLogger | undefined;
}) => {
    if (error instanceof CommandFailedError) {
        await interaction.reply({
            content: error.message,
            ephemeral: true,
        });
    }

    logger?.({ interaction, parameters, error });
};

export async function runAutocompleteInteraction(interaction: AutocompleteInteraction) {
    const command = commandLookup.get(interaction.commandName);

    if (command?.autocomplete === undefined) {
        throw new Error(`Autocomplete function not set for /${interaction.commandName}`);
    }

    await command.autocomplete(interaction);
}

const parameterTypeToDiscordType = (type: Parameter["type"]): ApplicationCommandOptionType => {
    const lookup = {
        string: ApplicationCommandOptionType.String,
        integer: ApplicationCommandOptionType.Integer,
        boolean: ApplicationCommandOptionType.Boolean,
        user: ApplicationCommandOptionType.User,
        channel: ApplicationCommandOptionType.Channel,
        role: ApplicationCommandOptionType.Role,
        mentionable: ApplicationCommandOptionType.Mentionable,
        attachment: ApplicationCommandOptionType.Attachment,
        // [ApplicationCommandOptionType.Number]: "",
    } satisfies Record<Parameter["type"], ApplicationCommandOptionType>;

    return lookup[type];
};

function generateCommandCallbackParameters<T extends Record<string, Parameter>>(
    interaction: CommandInteraction,
    parameters: T,
): InferParameterObject<T> {
    const parameter_entries = Object.entries(parameters).map(([name, parameter]) => {
        const isRequired = !parameter.optional;
        const option = interaction.options.get(name, isRequired);
        if (!option && isRequired) {
            throw new Error(`Option ${name} was not provided, but is required`);
        }

        const expectedType = parameterTypeToDiscordType(parameter.type);
        if (option && option.type !== expectedType)
            throw new Error(
                `/${interaction.commandName} parameter "${name}" has an incorrect type : ${ApplicationCommandOptionType[option.type]}`,
            );

        if (parameter.type === "boolean") return [name, option?.value];
        if (parameter.type === "string") return [name, option?.value];
        if (parameter.type === "integer") return [name, option?.value];
        if (parameter.type === "user") return [name, option?.user];
        if (parameter.type === "channel") return [name, option?.channel];
        if (parameter.type === "role") return [name, option?.role];
        if (parameter.type === "mentionable") return [name, option?.user];

        const attachment = option?.attachment ? createExtendedAttachment(option.attachment) : undefined;
        if (parameter.type === "attachment") return [name, attachment];

        throw new Error("Invalid Parameter Type");
    });

    return Object.fromEntries(parameter_entries) as InferParameterObject<T>;
}
