import { type CommandInteraction, type InteractionReplyOptions, type Message } from "discord.js";
import { buttonRow, type ButtonSettings } from "./buttons.js";

type MessageOptions = Omit<InteractionReplyOptions, "components"> & {
    buttons?: ButtonSettings[];
    public?: boolean;
};

export const reply = (interaction: CommandInteraction, message: string | MessageOptions): Promise<Message> => {
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
