import type { Interaction } from "discord.js";
import { runButtonInteraction } from "./button.js";
import { runModalSubmitInteraction } from "./modal.js";
import { runAutocompleteInteraction, runCommandInteraction } from "../commands/interaction.js";
import type { LoggingHandlers } from "../logging/index.js";

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
    } catch {
        /* empty */
    }
};
