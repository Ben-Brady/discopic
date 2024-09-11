import {
    ActionRowBuilder,
    ButtonBuilder,
    type CommandInteraction,
    type InteractionReplyOptions,
    type Message,
    type MessageActionRowComponentBuilder,
} from "discord.js";

type ComponentBuilder = ButtonBuilder;

export type MessageOptions = Omit<InteractionReplyOptions, "components"> & {
    components?: ComponentBuilder[] | ComponentBuilder[][];
    public?: boolean;
};

export const createReply =
    (interaction: CommandInteraction) =>
    (message: string | MessageOptions): Promise<Message> => {
        if (typeof message === "string")
            return interaction.reply({
                content: message,
                ephemeral: true,
                fetchReply: true,
            });

        let { components, ...rest } = message;
        let replyOptions: InteractionReplyOptions = rest;

        if (components) replyOptions.components = generateComponents(components);
        replyOptions.ephemeral = message.public !== true;

        return interaction.reply({ ...replyOptions, fetchReply: true });
    };

const MessageActionRow = ActionRowBuilder<MessageActionRowComponentBuilder>;
type MessageActionRow = ActionRowBuilder<MessageActionRowComponentBuilder>;

const generateComponents = (components: ComponentBuilder[] | ComponentBuilder[][]): MessageActionRow[] => {
    let componentRows: ComponentBuilder[][];

    if (Array.isArray(components[0])) {
        componentRows = components as ComponentBuilder[][];
    } else {
        componentRows = [components] as ComponentBuilder[][];
    }

    const createMessageRow = (row: ComponentBuilder[]) => new MessageActionRow({ components: row });
    return componentRows.map(createMessageRow);
};
