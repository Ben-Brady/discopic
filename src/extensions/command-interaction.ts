import {
    type CommandInteraction,
    type InteractionReplyOptions,
    type Message,
} from "discord.js";
import { buttonRow, type ButtonSettings } from "./buttons.js";

type isN_functions =
    | "inGuild"
    | "inCachedGuild"
    | "inRawGuild"
    | "isButton"
    | "isAutocomplete"
    | "isChatInputCommand"
    | "isCommand"
    | "isContextMenuCommand"
    | "isMessageComponent"
    | "isMessageContextMenuCommand"
    | "isModalSubmit"
    | "isUserContextMenuCommand"
    | "isSelectMenu"
    | "isAnySelectMenu"
    | "isStringSelectMenu"
    | "isUserSelectMenu"
    | "isRoleSelectMenu"
    | "isMentionableSelectMenu"
    | "isChannelSelectMenu"
    | "isRepliable";

export type ExtendedCommandInteraction = Omit<
    CommandInteraction,
    isN_functions | "reply"
> & {
    original: CommandInteraction;
    reply: (options: MessageOptions | string) => Promise<Message>;
};

type MessageOptions = Omit<InteractionReplyOptions, "components"> & {
    buttons?: ButtonSettings[];
    public?: boolean;
};

export const reply = (
    interaction: CommandInteraction,
    message: string | MessageOptions,
): Promise<Message> => {
    if (typeof message === "string")
        return interaction.reply({
            content: message,
            ephemeral: true,
            fetchReply: true,
        });

    let replyOptions: InteractionReplyOptions = { ...message };
    if (message.buttons) {
        replyOptions.components = [buttonRow(message.buttons)];
    }
    replyOptions.ephemeral = message.public !== true;

    return interaction.reply({ ...replyOptions, fetchReply: true });
};
