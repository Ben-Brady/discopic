import { ButtonBuilder, ButtonStyle, Client, type APIMessageComponentEmoji } from "discord.js";
import { createButtonCallback, type ButtonCallback } from "../interactions/button.js";

const ButtonTypesLookup = {
    primary: ButtonStyle.Primary,
    secondary: ButtonStyle.Secondary,
    success: ButtonStyle.Success,
    danger: ButtonStyle.Danger,
    link: ButtonStyle.Link,
} as const;
export type ButtonType = keyof typeof ButtonTypesLookup;

export type ButtonSettings = {
    title: string;
    type: ButtonType;
    disabled?: boolean;
    emoji?: APIMessageComponentEmoji;
} & (
    | { type: "link"; url: string }
    // Callback is required for all button types except "link"
    | { type: Exclude<ButtonType, "link">; callback: ButtonCallback }
);

export function createButton(client: Client, settings: ButtonSettings): ButtonBuilder {
    const callbackSettings =
        settings.type === "link" ? { url: settings.url } : { custom_id: createButtonCallback(settings.callback) };

    return new ButtonBuilder({
        ...callbackSettings,
        style: ButtonTypesLookup[settings.type],
        label: settings.title,
        emoji: settings.emoji,
        disabled: settings.disabled,
    });
}
