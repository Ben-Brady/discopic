import type { ModalSubmitInteraction } from "discord.js";
import { InteractionManger } from "./manager.js";

const interactions = new InteractionManger<ModalSubmitInteraction>();

export type ModalCallback = (
    interaction: ModalSubmitInteraction,
) => void | Promise<void>;

export const runModalSubmitInteraction = interactions.runInteraction;
export const createModalCallback = interactions.createCallback;
