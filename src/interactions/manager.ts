import type * as discord from "discord.js";

type Interaction = discord.ButtonInteraction | discord.ModalSubmitInteraction;

type InteractionHandler<T extends Interaction = Interaction> = (
    interaction: T,
) => void | Promise<void>;

export class InteractionManger<T extends Interaction> {
    interaction_map: Map<string, InteractionHandler<T>>;

    constructor() {
        this.interaction_map = new Map();
    }

    createCallback(handler: InteractionHandler<T>): string {
        const createRandomCharacters = (length: number) =>
            Math.random()
                .toString(36)
                .slice(2, length + 2);
        const customId = createRandomCharacters(10);
        this.interaction_map.set(customId, handler);

        // Delete if not triggered within an hour
        const TIMEOUT = 60 * 60 * 1000;
        setTimeout(() => {
            this.interaction_map.delete(customId);
        }, TIMEOUT);

        return customId;
    }

    async runInteraction(interaction: T) {
        const handler = this.interaction_map.get(interaction.customId);
        if (handler) await handler(interaction);
    }
}
