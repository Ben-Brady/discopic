import {
    StringSelectMenuBuilder,
    StringSelectMenuInteraction,
    StringSelectMenuOptionBuilder,
    type Client,
    type ComponentEmojiResolvable,
} from "discord.js";
import { createStringSelectCallback, ensureInteractionListeners } from "../interactions/run.js";

export type StringSelectionSettings<TLabel extends string = string, TValue extends string = string> = {
    options: Record<TLabel, TValue> | StringOptionSettings<TLabel, TValue>[];
    onSelect: (interaction: StringSelectMenuInteraction) => void;

    defaultValue?: TValue | TValue[];
    placeholder?: string;
    disabled?: boolean;
    minValues?: number;
    maxValues?: number;
};

export type StringOptionSettings<TLabel extends string, TValue extends string> = {
    label: TLabel;
    value: TValue;
    description?: string;
    isDefault?: boolean;
    emoji?: ComponentEmojiResolvable;
};

export function createStringSelect(
    client: Client,
    settings: StringSelectionSettings<any, any>,
): StringSelectMenuBuilder {
    ensureInteractionListeners(client);

    return new StringSelectMenuBuilder({
        custom_id: createStringSelectCallback(settings.onSelect),
        disabled: settings.disabled,
        placeholder: settings.placeholder,
        maxValues: settings.maxValues,
        minValues: settings.minValues,
        options: createStringSelectOptions(settings).map(v => v.toJSON()),
    });
}

const createStringSelectOptions = (settings: StringSelectionSettings): StringSelectMenuOptionBuilder[] => {
    const defaultValues =
        settings.defaultValue === undefined
            ? []
            : Array.isArray(settings.defaultValue)
              ? settings.defaultValue
              : [settings.defaultValue];

    if (!Array.isArray(settings.options)) {
        return Object.entries(settings.options).map(
            ([label, value]) =>
                new StringSelectMenuOptionBuilder({
                    label,
                    value,
                    default: defaultValues.includes(value),
                }),
        );
    }

    return settings.options.map(
        option =>
            new StringSelectMenuOptionBuilder({
                label: option.label,
                value: option.value,
                description: option.description,
                emoji: option.emoji,
                default: option.isDefault || defaultValues.includes(option.value),
            }),
    );
};
