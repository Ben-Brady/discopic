import type { StringSelectMenuInteraction } from "discord.js";
import { InteractionManger } from "./manager.js";

const stringSelectInteraction = new InteractionManger<StringSelectMenuInteraction>();

export const runStringSelectInteraction = (interaction: StringSelectMenuInteraction) =>
    stringSelectInteraction.runInteraction(interaction);
export const createStringSelectCallback = (handler: (_: StringSelectMenuInteraction) => void) =>
    stringSelectInteraction.createCallback(handler);
