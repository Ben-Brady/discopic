import {
    StringSelectMenuBuilder,
    StringSelectMenuInteraction,
    StringSelectMenuOptionBuilder,
    type Client,
    type ComponentEmojiResolvable,
} from "discord.js";
import { createStringSelectCallback } from "../interactions/selection.js";
import { createSelectContext, type SelectionContext } from "./context/selection.js";

export type StringSelectionSettings<TLabel extends string = string, TValue extends string = string> = {
    placeholder?: string;
    disabled?: boolean;
    minValues?: number;
    maxValues?: number;
    default?: NoInfer<TLabel>;
    options: Record<TLabel, TValue> | StringOptionSettings<TLabel, TValue>[];
    onSelect: (_: { ctx: SelectionContext; interaction: StringSelectMenuInteraction; selected: TValue[] }) => void;
};

type StringOptionSettings<TLabel extends string, TValue extends string> = {
    label: TLabel;
    value: TValue;
    description?: string;
    emoji?: ComponentEmojiResolvable;
};

export type StringSelect = StringSelectMenuBuilder;

export function createStringSelect(client: Client, settings: StringSelectionSettings): StringSelectMenuBuilder {
    const custom_id = createStringSelectCallback(interaction =>
        settings.onSelect({ interaction, selected: interaction.values, ctx: createSelectContext(client) }),
    );

    return new StringSelectMenuBuilder({
        disabled: settings.disabled,
        placeholder: settings.placeholder,
        maxValues: settings.maxValues,
        minValues: settings.minValues,
        options: createStringSelectOptions(settings).map(v => v.toJSON()),
        custom_id,
    });
}

const createStringSelectOptions = (settings: StringSelectionSettings): StringSelectMenuOptionBuilder[] => {
    if (!Array.isArray(settings.options)) {
        return Object.entries(settings.options).map(
            ([label, value]) =>
                new StringSelectMenuOptionBuilder({
                    label,
                    value,
                    default: label === settings.default,
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
                default: option.label === settings.default,
            }),
    );
};
