import { ButtonBuilder } from "discord.js";
import type { ButtonSettings } from "../buttons.js";

export type BaseContext = {
    createButton: (settings: ButtonSettings) => ButtonBuilder;
};
