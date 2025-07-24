import {
    ActionRowBuilder,
    ButtonBuilder,
    StringSelectMenuBuilder,
    type MessageActionRowComponentBuilder,
} from "discord.js";

type ComponentBuilder = ButtonBuilder | StringSelectMenuBuilder;

const MessageActionRow = ActionRowBuilder<MessageActionRowComponentBuilder>;
type MessageActionRow = ActionRowBuilder<MessageActionRowComponentBuilder>;

export const createComponents = (components: ComponentBuilder[] | ComponentBuilder[][]): MessageActionRow[] => {
    let componentRows: ComponentBuilder[][];

    if (Array.isArray(components[0])) {
        componentRows = components as ComponentBuilder[][];
    } else {
        componentRows = [components] as ComponentBuilder[][];
    }

    const createMessageRow = (row: ComponentBuilder[]) => new MessageActionRow({ components: row });
    return componentRows.map(createMessageRow);
};
