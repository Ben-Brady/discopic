import {
    ApplicationCommandOptionType,
    Client,
    type AutocompleteInteraction,
    type ChatInputCommandInteraction,
} from "discord.js";
import type { Command, InferCommandParameters, Parameter } from "./command.js";
import { createExtendedAttachment } from "../extensions/attachment.js";
import type { CommandLogger } from "./logger.js";
import { getDiscopicInternals } from "../internals.js";

export const registerCommand = (client: Client, command: Command) => {
    const internals = getDiscopicInternals(client);
    internals.commands.push(command);
};

export async function runCommandInteraction(
    interaction: ChatInputCommandInteraction,
    logger: CommandLogger | undefined,
) {
    const command = getCommand(interaction);
    if (!command) return;

    const parameters = generateCommandCallbackParameters(interaction, command.parameters ?? {});

    try {
        await command.execute(interaction, parameters);
        attempt(() => logger?.({ command, interaction, parameters, error: undefined }));
    } catch (err) {
        attempt(() => logger?.({ command, interaction, parameters, error: err }));
    }
}

const attempt = (callback: () => void) => {
    try {
        callback();
    } catch (e) {
        console.error(e);
    }
};

export async function runAutocompleteInteraction(interaction: AutocompleteInteraction) {
    const command = getCommand(interaction);

    if (command?.autocomplete === undefined) {
        throw new Error(`Autocomplete function not set for /${interaction.commandName}`);
    }

    await command.autocomplete(interaction);
}

function getCommand(interaction: ChatInputCommandInteraction | AutocompleteInteraction): Command | undefined {
    const { commands } = getDiscopicInternals(interaction.client);

    const command = commands.find(({ name, group }) => {
        const commandName = interaction.commandName;
        if (group) {
            const subcommand = interaction.options.getSubcommand(false);
            return group.name === commandName && name === subcommand;
        } else {
            return name === commandName;
        }
    });

    return command;
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
    interaction: ChatInputCommandInteraction,
    parameters: T,
): InferCommandParameters<T> {
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

    return Object.fromEntries(parameter_entries) as InferCommandParameters<T>;
}
