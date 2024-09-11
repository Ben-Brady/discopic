import { ButtonBuilder, Client } from "discord.js";
import { createButton, type ButtonSettings } from "../buttons.js";
import { createStringSelect, type StringSelect, type StringSelectionSettings } from "../selection.js";

export type BaseContext = {
    createButton: (settings: ButtonSettings) => ButtonBuilder;
    createStringSelection: <TLabel extends string, TValue extends string>(
        settings: StringSelectionSettings<TLabel, TValue>,
    ) => StringSelect;
};

export const createBaseContext = (client: Client): BaseContext => ({
    createButton: settings => createButton(client, settings),
    createStringSelection: settings => createStringSelect(client, settings),
});
