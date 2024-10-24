import { EmbedBuilder, type APIEmbed } from "discord.js";
import { validateEmbedDescription, validateEmbedFields, validateEmbedTitle } from "../verify.js";

export const createEmbed = (settings: EmbedSettings): EmbedBuilder => {
    const fields = generateFields(settings.fields);
    validateEmbedFields(fields);
    validateEmbedTitle(settings.title);
    validateEmbedDescription(settings.description);

    const embed = new EmbedBuilder({
        ...settings,
        fields,
    });
    return embed;
};

const generateFields = (fields: APIEmbed["fields"] | Record<string, string>): APIEmbed["fields"] => {
    if (!fields || Array.isArray(fields)) {
        return fields;
    }

    return Object.entries<string>(fields).map(([name, value]) => ({
        name,
        value,
        inline: true,
    }));
};

type EmbedSettings = Omit<APIEmbed, "fields"> & {
    fields: APIEmbed["fields"] | Record<string, string>;
};
