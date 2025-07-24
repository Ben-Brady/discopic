import type { ButtonInteraction, Client, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import { getDiscopicInternals } from "../internals.js";
import { createInteractionManger } from "./manager.js";

export type ModalCallback = (interaction: ModalSubmitInteraction) => void | Promise<void>;
const modalManager = createInteractionManger<ModalSubmitInteraction>();
const runModalSubmitInteraction = modalManager.runInteraction;
export const createModalCallback = modalManager.createCallback;

export type ButtonCallback = (interaction: ButtonInteraction) => void | Promise<void>;
const buttonManager = createInteractionManger<ButtonInteraction>();
const runButtonInteraction = buttonManager.runInteraction;
export const createButtonCallback = buttonManager.createCallback;

const stringSelectManager = createInteractionManger<StringSelectMenuInteraction>();
const runStringSelectInteraction = stringSelectManager.runInteraction;
export const createStringSelectCallback = stringSelectManager.createCallback;

export const ensureInteractionListeners = (client: Client) => {
    const internals = getDiscopicInternals(client);
    if (internals.attachedListeners) return;

    internals.attachedListeners = true;
    client.on("interactionCreate", interaction => {
        try {
            if (interaction.isButton()) runButtonInteraction(interaction);
            if (interaction.isModalSubmit()) runModalSubmitInteraction(interaction);
            if (interaction.isStringSelectMenu()) runStringSelectInteraction(interaction);
        } catch (e) {
            console.error(e);
            /* empty */
        }
    });
};
