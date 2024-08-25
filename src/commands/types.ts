import {
    type APIInteractionDataResolvedChannel,
    type APIRole,
    type AutocompleteInteraction,
    type CommandInteraction,
    type GuildBasedChannel,
    type Role,
    type SlashCommandBuilder,
    type User,
} from "discord.js";
import type { ExtendedAttachment } from "../extensions/attachment.js";
import type { ExtendedCommandInteraction } from "../extensions/command-interaction.js";

export type CommandBuilder = Omit<
    SlashCommandBuilder,
    "addSubcommand" | "addSubcommandGroup"
>;

export type Command<
    TParams extends Record<string, Parameter> = Record<string, Parameter>,
> = {
    name: string;
    description: string;
    nsfw?: boolean;
    parameters?: TParams;
    execute: (response: {
        interaction: CommandInteraction;
        parameters: InferParameterObject<TParams>;
    }) => Promise<unknown>;

    autocomplete?: (interaction: AutocompleteInteraction) => Promise<unknown>;
    additional_data?: CommandBuilder;
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
    required?: boolean;
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

export type InferParameterOptionality<
    TParam extends Parameter,
    TType,
> = TParam extends {
    required: true;
}
    ? TType
    : TType | undefined;

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

export type InferParameterType<T extends Parameter> =
    T["type"] extends keyof ParameterInferLookup
        ? ParameterInferLookup[T["type"]]
        : never;

export type InferParameterObject<T extends Record<string, Parameter>> = {
    [Key in keyof T as Key]: InferParameterOptionality<
        T[Key],
        InferParameterType<T[Key]>
    >;
};

export function createCommand<
    TParams extends Record<string, Parameter>,
>(command: {
    name: string;
    description: string;
    nsfw?: boolean;
    parameters?: TParams;
    execute: (response: {
        interaction: ExtendedCommandInteraction;
        parameters: InferParameterObject<TParams>;
    }) => Promise<unknown>;

    autocomplete?: (interaction: AutocompleteInteraction) => Promise<unknown>;
    additional_data?: CommandBuilder;
}): Command<TParams> {
    return command;
}
