import { ButtonInteraction } from "discord.js";
import { InteractionManger } from "./manager.js";
import { createButtonContext, type ButtonContext } from "../extensions/context/button.js";

const interactions = new InteractionManger<ButtonInteraction>();

export type ButtonCallback = ({
    interaction,
    ctx,
}: {
    ctx: ButtonContext;
    interaction: ButtonInteraction;
}) => void | Promise<void>;

export const runButtonInteraction = (interaction: ButtonInteraction) => interactions.runInteraction(interaction);
export const createButtonCallback = (handler: ButtonCallback) =>
    interactions.createCallback(interaction => {
        handler({
            interaction,
            ctx: createButtonContext(interaction),
        });
    });
