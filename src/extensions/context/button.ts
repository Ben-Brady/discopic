import { ButtonInteraction } from "discord.js";
import { createButton } from "../buttons.js";
import type { BaseContext } from "./base.js";

export type ButtonContext = BaseContext;

export const createButtonContext = (interaction: ButtonInteraction): ButtonContext => {
    return {
        createButton: settings => createButton(interaction.client, settings),
    };
};
