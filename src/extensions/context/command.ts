import { type CommandInteraction, type Message } from "discord.js";
import { createButton } from "../buttons.js";
import type { BaseContext } from "./base.js";
import { createReply, type MessageOptions } from "../command-context.js";

export type CommandContext = {
    reply: (message: string | MessageOptions) => Promise<Message>;
} & BaseContext;

export const createCommandContext = (interaction: CommandInteraction): CommandContext => {
    return {
        reply: createReply(interaction),
        createButton: settings => createButton(interaction.client, settings),
    };
};
