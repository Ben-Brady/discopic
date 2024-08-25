import { ButtonBuilder, ButtonStyle } from "discord.js";
import {
    ButtonInteraction,
    ActionRowBuilder,
    type APIMessageComponentEmoji,
} from "discord.js";
import { InteractionManger } from "./interactions.js";

const interactions = new InteractionManger<ButtonInteraction>();
type InteractionHandler = (
    interaction: ButtonInteraction,
) => void | Promise<void>;

const ButtonTypesLookup = {
    primary: ButtonStyle.Primary,
    secondary: ButtonStyle.Secondary,
    success: ButtonStyle.Success,
    danger: ButtonStyle.Danger,
    link: ButtonStyle.Link,
} as const;
type ButtonType = keyof typeof ButtonTypesLookup;

type ButtonSettings = {
    title: string;
    type: ButtonType;
    disabled?: boolean;
    emoji?: APIMessageComponentEmoji;
} & (
    | { type: "link"; url: string }
    // Callback is required for all button types except "link"
    | { type: Exclude<ButtonType, "link">; callback: InteractionHandler }
);

export async function runButtonInteraction(
    interaction: ButtonInteraction,
): Promise<void> {
    await interactions.runInteraction(interaction);
}

export function createButtonRow(
    ...buttons: ButtonBuilder[]
): ActionRowBuilder<ButtonBuilder> {
    return new ActionRowBuilder({ components: buttons });
}

export function createButton(settings: ButtonSettings): ButtonBuilder {
    let additionalSettings: { url: string } | { custom_id: string };
    if (settings.type === "link") {
        additionalSettings = { url: settings.url };
    } else {
        const custom_id = interactions.createCallback(settings.callback);
        additionalSettings = { custom_id };
    }

    const style = ButtonTypesLookup[settings.type];
    return new ButtonBuilder({
        label: settings.title,
        emoji: settings.emoji,
        disabled: settings.disabled,
        style,
        ...additionalSettings,
    });
}

export function createButtons(
    ...settings: ButtonSettings[]
): ActionRowBuilder<ButtonBuilder> {
    return new ActionRowBuilder<ButtonBuilder>({
        components: settings.map(createButton),
    });
}
