import type * as discord from "discord.js";

type Interaction = discord.ButtonInteraction | discord.ModalSubmitInteraction | discord.StringSelectMenuInteraction;

export type InteractionHandler<T extends Interaction = Interaction> = (interaction: T) => void | Promise<void>;

export const createInteractionManger = <T extends Interaction>() => {
    const interaction_map = new Map();

    function createCallback(handler: InteractionHandler<T>): string {
        const createRandomCharacters = (length: number) =>
            Math.random()
                .toString(36)
                .slice(2, length + 2);

        const customId = createRandomCharacters(10);
        interaction_map.set(customId, handler);

        // Delete if not triggered within an hour
        const TIMEOUT = 60 * 60 * 1000;
        setTimeout(() => {
            interaction_map.delete(customId);
        }, TIMEOUT);

        return customId;
    }

    async function runInteraction(interaction: T) {
        const handler = interaction_map.get(interaction.customId);
        if (handler) await handler(interaction);
    }
    return { createCallback, runInteraction };
};
