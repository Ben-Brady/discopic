import { ButtonInteraction } from "discord.js";
import { InteractionManger } from "./manager.js";

const interactions = new InteractionManger<ButtonInteraction>();

export type ButtonCallback = (
    interaction: ButtonInteraction,
) => void | Promise<void>;

export const runButtonInteraction = interactions.runInteraction;
export const createButtonCallback = interactions.createCallback;
