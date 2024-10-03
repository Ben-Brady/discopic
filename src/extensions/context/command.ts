import { type CommandInteraction } from "discord.js";
import { createBaseContext, type BaseContext } from "./base.js";
import { createReply, type Reply } from "../../actions/reply.js";

export type CommandContext = {
    reply: Reply;
} & BaseContext;

export const createCommandContext = (interaction: CommandInteraction): CommandContext => {
    return {
        reply: createReply(interaction.reply),
        ...createBaseContext(interaction.client),
    };
};
