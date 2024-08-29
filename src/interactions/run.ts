import type { Interaction } from "discord.js";
import { runButtonInteraction } from "./button.js";
import { runModalSubmitInteraction } from "./modal.js";
import {
    runAutocompleteInteraction,
    runCommandInteraction,
} from "../commands/interaction.js";

export const runInteraction = async (interation: Interaction) => {
    try {
        if (interation.isButton()) await runButtonInteraction(interation);
        if (interation.isModalSubmit())
            await runModalSubmitInteraction(interation);
        if (interation.isChatInputCommand())
            await runCommandInteraction(interation);
        if (interation.isAutocomplete())
            await runAutocompleteInteraction(interation);
    } catch (err: unknown) {
        console.log("Interaction Failed");
        console.error(err);
    }
};
