import type { ModalActionRowComponentBuilder } from "discord.js";
import { ActionRowBuilder, ModalBuilder } from "discord.js";
import { createModalCallback, type ModalCallback } from "../interactions/modal.js";

type ModalSettings = {
    title: string;
    components: ModalActionRowComponentBuilder[];
    callback: ModalCallback;
};

export function createModal({ title, components, callback }: ModalSettings) {
    return new ModalBuilder({
        title,
        components: components.map(createModalRow),
        custom_id: createModalCallback(callback),
    });
}

function createModalRow(component: ModalActionRowComponentBuilder) {
    return new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(component);
}
