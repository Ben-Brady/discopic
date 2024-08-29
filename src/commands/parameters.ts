import { type ApplicationCommandOptionBase } from "discord.js";
import type {
    ChannelParameter,
    CommandBuilder,
    IntegerParameter,
    MentionableParameter,
    Parameter,
    RoleParameter,
    StringParameter,
    UserParameter,
} from "./types.js";
import { intoDiscordChannelType } from "../enums/channelType.js";

export function addOptionToCommand(
    command: CommandBuilder,
    name: string,
    parameter: Parameter,
) {
    const lookup = {
        boolean: bindBooleanOption,
        string: bindStringOption,
        integer: bindIntegerOption,
        user: bindUserOption,
        channel: bindChannelOption,
        role: bindRoleOption,
        mentionable: bindMentionableOption,
        attachment: bindAttachmentOption,
    } satisfies Record<Parameter["type"], any>;

    const callback = lookup[parameter.type];

    callback(command, name, parameter as any);
}

function applyGenericOptionMetadata<T extends ApplicationCommandOptionBase>(
    option: T,
    name: string,
    parameter: Parameter,
) {
    option.setName(name);
    option.setDescription(parameter.description ?? "");
    option.setRequired(!parameter.optional);
}

const bindBooleanOption = (
    command: CommandBuilder,
    name: string,
    parameter: ChannelParameter,
) => {
    command.addBooleanOption(option => {
        applyGenericOptionMetadata(option, name, parameter);
        return option;
    });
};

const bindIntegerOption = (
    command: CommandBuilder,
    name: string,
    parameter: IntegerParameter,
) => {
    command.addIntegerOption(option => {
        if (parameter.min !== undefined) option.setMinValue(parameter.min);
        if (parameter.max !== undefined) option.setMaxValue(parameter.max);

        applyGenericOptionMetadata(option, name, parameter);
        return option;
    });
};

const bindStringOption = (
    command: CommandBuilder,
    name: string,
    parameter: StringParameter,
) => {
    command.addStringOption(option => {
        if (parameter.minLength !== undefined)
            option.setMinLength(parameter.minLength);
        if (parameter.maxLength !== undefined)
            option.setMaxLength(parameter.maxLength);

        applyGenericOptionMetadata(option, name, parameter);
        return option;
    });
};

const bindUserOption = (
    command: CommandBuilder,
    name: string,
    parameter: UserParameter,
) => {
    command.addUserOption(option => {
        applyGenericOptionMetadata(option, name, parameter);
        return option;
    });
};

const bindRoleOption = (
    command: CommandBuilder,
    name: string,
    parameter: RoleParameter,
) => {
    command.addRoleOption(option => {
        applyGenericOptionMetadata(option, name, parameter);
        return option;
    });
};

const bindAttachmentOption = (
    command: CommandBuilder,
    name: string,
    parameter: MentionableParameter,
) => {
    command.addAttachmentOption(option => {
        applyGenericOptionMetadata(option, name, parameter);
        return option;
    });
};

const bindMentionableOption = (
    command: CommandBuilder,
    name: string,
    parameter: MentionableParameter,
) => {
    command.addMentionableOption(option => {
        applyGenericOptionMetadata(option, name, parameter);
        return option;
    });
};

const bindChannelOption = (
    command: CommandBuilder,
    name: string,
    parameter: ChannelParameter,
) => {
    command.addNumberOption(option => option);

    command.addChannelOption(option => {
        if (parameter.allowedChannelTypes) {
            const channels = parameter.allowedChannelTypes.map(
                intoDiscordChannelType,
            );
            //@ts-expect-error, type hinted that it's only manually selected channels
            option.addChannelTypes(channels);
        }

        applyGenericOptionMetadata(option, name, parameter);
        return option;
    });
};
