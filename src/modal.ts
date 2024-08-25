import type {
    ModalActionRowComponentBuilder,
    ModalSubmitInteraction,
} from "discord.js";
import { ActionRowBuilder, ModalBuilder } from "discord.js";
import { InteractionManger } from "./interactions.js";

type InteractionHandler = (
    interaction: ModalSubmitInteraction,
) => void | Promise<void>;
const interactions = new InteractionManger<ModalSubmitInteraction>();

export async function runModalSubmitInteraction(
    interaction: ModalSubmitInteraction,
): Promise<void> {
    await interactions.runInteraction(interaction);
}

type ModalSettings = {
    title: string;
    components: ModalActionRowComponentBuilder[];
    callback: InteractionHandler;
};

export function createModal({ title, components, callback }: ModalSettings) {
    const custom_id = interactions.createCallback(callback);
    return new ModalBuilder({
        title,
        components: components.map(createModalRow),
        custom_id: custom_id,
    });
}

function createModalRow(component: ModalActionRowComponentBuilder) {
    return new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        component,
    );
}
