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
import type { CommandContext } from "../extensions/context/command.js";

export type Command<TParams extends Record<string, Parameter> = Record<string, Parameter>> = {
    name: string;
    description: string;
    nsfw: boolean;
    serverOnly: boolean;
    parameters: TParams;
    execute: (response: {
        interaction: CommandInteraction;
        parameters: InferCommandParameterS<TParams>;
        ctx: CommandContext;
    }) => Promise<unknown>;

    group?: CommandGroup;
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<unknown>;
    additional_data?: SlashCommandBuilder;
};

export type CommandGroup = {
    name: string;
    description: string;
    nsfw: boolean;
    serverOnly: boolean;
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
    allowedChannelTypes?: ValidParameterChannelTypes[];
};

export type BooleanParameter = BaseParameter & {
    type: "boolean";
};

export type UserParameter = BaseParameter & {
    type: "user";
};

export type RoleParameter = BaseParameter & {
    type: "role";
};

export type MentionableParameter = BaseParameter & {
    type: "mentionable";
};

export type AttachmentParameter = BaseParameter & {
    type: "attachment";
};

type ValidParameterChannelTypes =
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

export type InferParameterOptionality<TType, TParam extends Parameter> = TParam extends {
    optional: true;
}
    ? TType | undefined
    : TType;

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

export type CommandParameters = Record<string, ParameterType>;
export type ParameterType = ParameterInferLookup[keyof ParameterInferLookup];

export type InferParameterType<T extends Parameter> = T["type"] extends keyof ParameterInferLookup
    ? ParameterInferLookup[T["type"]]
    : never;

export type InferCommandParameterS<T extends Record<string, Parameter>> = {
    [Key in keyof T as Key]: InferParameterOptionality<InferParameterType<T[Key]>, T[Key]>;
};

type CommandSettings<TParams extends Record<string, Parameter>> = {
    name: string;
    description: string;
    nsfw?: boolean;
    group?: CommandGroup;
    serverOnly?: boolean;
    parameters?: TParams;
    execute: (response: {
        ctx: CommandContext;
        interaction: CommandInteraction;
        parameters: InferCommandParameterS<TParams>;
    }) => Promise<unknown>;

    autocomplete?: (interaction: AutocompleteInteraction) => Promise<unknown>;
    additional_data?: SlashCommandBuilder;
};

/**
 * Create a command object
 */
export function createCommand<TParams extends Record<string, Parameter>>(
    command: CommandSettings<TParams>,
): Command<TParams> {
    return {
        nsfw: command.nsfw ?? false,
        serverOnly: command.serverOnly ?? false,
        parameters: command.parameters ?? ({} as TParams),
        ...command,
    };
}

type GroupSettings = {
    name: string;
    description: string;
    nsfw?: boolean;
    serverOnly?: boolean;
    additional_data?: SlashCommandBuilder;
};

/**
 * Create a command group
 */
export function createCommandGroup(group: GroupSettings): CommandGroup {
    return {
        nsfw: group.nsfw ?? false,
        serverOnly: group.serverOnly ?? false,
        ...group,
    };
}
