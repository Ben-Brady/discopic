import { ButtonInteraction } from "discord.js";
import { InteractionManger, type InteractionHandler } from "./manager.js";

const interactions = new InteractionManger<ButtonInteraction>();

export type ButtonCallback = (interaction: ButtonInteraction) => void | Promise<void>;

export const runButtonInteraction = (interaction: ButtonInteraction) => interactions.runInteraction(interaction);
export const createButtonCallback = (handler: InteractionHandler<ButtonInteraction>) =>
    interactions.createCallback(handler);
