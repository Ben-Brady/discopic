import {
    CommandInteraction,
    type APIInteractionDataResolvedChannel,
    type APIRole,
    type AutocompleteInteraction,
    type GuildBasedChannel,
    type Role,
    type SlashCommandBuilder,
    type User,
} from "discord.js";
import type { ExtendedAttachment } from "../extensions/attachment.js";
import { type Permission } from "../enums/permissions.js";

export type Command<TParams extends Record<string, Parameter> = Record<string, Parameter>> = {
    name: string;
    description: string;
    nsfw: boolean;
    serverOnly: boolean;
    parameters: TParams;
    execute: (interaction: CommandInteraction, parameters: InferCommandParameters<TParams>) => void | Promise<void>;

    group?: CommandGroup;
    autocomplete?: (interaction: AutocompleteInteraction) => void | Promise<void>;
    additional_data?: SlashCommandBuilder;
};

export type CommandGroup = {
    name: string;
    description: string;
    nsfw: boolean;
    serverOnly: boolean;
    commands: Command<any>[];
    permissions?: Permission;
    additional_data?: SlashCommandBuilder;
};

export type Parameter =
    | StringParameter
    | IntegerParameter
    | BooleanParameter
    | UserParameter
    | ChannelParameter
    | RoleParameter
    | MentionableParameter
    | AttachmentParameter;

export type BaseParameter = {
    type: string;
    description: string;
    optional?: boolean;
};

export type StringParameter = BaseParameter & {
    type: "string";
    minLength?: number;
    maxLength?: number;
};

export type IntegerParameter = BaseParameter & {
    type: "integer";
    min?: number;
    max?: number;
};

export type ChannelParameter = BaseParameter & {
    type: "channel";
    allowedChannelTypes?: ChannelType[];
};

type ChannelType =
    | "GuildText"
    | "GuildVoice"
    | "GuildCategory"
    | "GuildAnnouncement"
    | "AnnouncementThread"
    | "PublicThread"
    | "PrivateThread"
    | "GuildStageVoice"
    | "GuildForum"
    | "GuildMedia";

export type BooleanParameter = BaseParameter & { type: "boolean" };
export type UserParameter = BaseParameter & { type: "user" };
export type RoleParameter = BaseParameter & { type: "role" };
export type MentionableParameter = BaseParameter & { type: "mentionable" };
export type AttachmentParameter = BaseParameter & { type: "attachment" };

type ParameterInferLookup = {
    boolean: boolean;
    string: string;
    integer: number;
    user: User;
    channel: GuildBasedChannel | APIInteractionDataResolvedChannel | null;
    role: Role | APIRole | null;
    mentionable: User;
    attachment: ExtendedAttachment;
};

export type ParameterType = ParameterInferLookup[keyof ParameterInferLookup];
export type CommandParameters = Record<string, ParameterType>;

type InferParameterType<T extends Parameter> = T extends {
    optional: true;
}
    ? ParameterInferLookup[T["type"]] | undefined
    : ParameterInferLookup[T["type"]];

export type InferCommandParameters<T extends Record<string, Parameter>> = {
    [Key in keyof T]: InferParameterType<T[Key]>;
};

/**
 * Create a command object
 */
export function createCommand<TParams extends Record<string, Parameter>>(settings: {
    name: string;
    description: string;
    nsfw?: boolean;
    serverOnly?: boolean;
    permission?: Permission;

    group?: CommandGroup;
    parameters?: TParams;
    execute: (interaction: CommandInteraction, parameters: InferCommandParameters<TParams>) => Promise<void> | void;
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void> | void;

    additional_data?: SlashCommandBuilder;
}): Command<TParams> {
    return {
        nsfw: settings.nsfw ?? false,
        serverOnly: settings.serverOnly ?? false,
        parameters: settings.parameters ?? ({} as TParams),
        ...settings,
    };
}

/**
 * Create a command group
 */
export function createCommandGroup(settings: {
    name: string;
    description: string;
    commands: Command[];
    nsfw?: boolean;
    serverOnly?: boolean;
    permission?: Permission;

    additional_data?: SlashCommandBuilder;
}): CommandGroup {
    const group = {
        nsfw: settings.nsfw ?? false,
        serverOnly: settings.serverOnly ?? false,
        ...settings,
    };
    group.commands.forEach(v => (v.group = group));
    return group;
}
