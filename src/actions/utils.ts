import { ActionRowBuilder, ButtonBuilder, type MessageActionRowComponentBuilder } from "discord.js";
import type { StringSelect } from "../extensions/selection.js";

type ComponentBuilder = ButtonBuilder | StringSelect;

const MessageActionRow = ActionRowBuilder<MessageActionRowComponentBuilder>;
type MessageActionRow = ActionRowBuilder<MessageActionRowComponentBuilder>;

export const generateComponents = (components: ComponentBuilder[] | ComponentBuilder[][]): MessageActionRow[] => {
    let componentRows: ComponentBuilder[][];

    if (Array.isArray(components[0])) {
        componentRows = components as ComponentBuilder[][];
    } else {
        componentRows = [components] as ComponentBuilder[][];
    }

    const createMessageRow = (row: ComponentBuilder[]) => new MessageActionRow({ components: row });
    return componentRows.map(createMessageRow);
};
