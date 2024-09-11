import type { Interaction } from "discord.js";
import type { LoggingHandlers } from "../logging/index.js";
import { runButtonInteraction } from "./button.js";
import { runModalSubmitInteraction } from "./modal.js";
import { runAutocompleteInteraction, runCommandInteraction } from "./command.js";
import { runStringSelectInteraction } from "./selection.js";

export const runInteraction = async ({
    interaction,
    logging,
}: {
    interaction: Interaction;
    logging: LoggingHandlers;
}) => {
    try {
        if (interaction.isButton()) await runButtonInteraction(interaction);
        if (interaction.isModalSubmit()) await runModalSubmitInteraction(interaction);
        if (interaction.isChatInputCommand()) await runCommandInteraction(interaction, logging.command || undefined);
        if (interaction.isAutocomplete()) await runAutocompleteInteraction(interaction);
        if (interaction.isStringSelectMenu()) await runStringSelectInteraction(interaction);
    } catch {
        /* empty */
    }
};
