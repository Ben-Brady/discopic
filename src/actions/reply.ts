import {
    ButtonBuilder,
    type CommandInteraction,
    type InteractionReplyOptions,
    type Message,
} from "discord.js";
import type { StringSelect } from "../extensions/selection.js";
import { generateComponents } from "./utils.js";

export type Reply = (message: string | MessageOptions) => Promise<Message>;

type ComponentBuilder = ButtonBuilder | StringSelect;

export type MessageOptions = Omit<InteractionReplyOptions, "components"> & {
    components?: ComponentBuilder[] | ComponentBuilder[][];
    public?: boolean;
};

export const createReply =
    (reply: CommandInteraction["reply"]): Reply =>
    message => {
        if (typeof message === "string")
            return reply({
                content: message,
                ephemeral: true,
                fetchReply: true,
            });

        let { components, ...rest } = message;
        let replyOptions: InteractionReplyOptions = rest;

        if (components) replyOptions.components = generateComponents(components);
        replyOptions.ephemeral = message.public !== true;

        return reply({ ...replyOptions, fetchReply: true });
    };
