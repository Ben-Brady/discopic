import type { Client, ModalActionRowComponentBuilder } from "discord.js";
import { ActionRowBuilder, ModalBuilder } from "discord.js";
import { createModalCallback, ensureInteractionListeners, type ModalCallback } from "../interactions/run.js";

export type ModalSettings = {
    title: string;
    components: ModalActionRowComponentBuilder[];
    onSubmit: ModalCallback;
};

export function createModal(client: Client, { title, components, onSubmit }: ModalSettings) {
    ensureInteractionListeners(client);
    return new ModalBuilder({
        title,
        components: components.map(createModalRow),
        custom_id: createModalCallback(onSubmit),
    });
}

function createModalRow(component: ModalActionRowComponentBuilder) {
    return new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(component);
}
