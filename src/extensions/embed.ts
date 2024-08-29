import { EmbedBuilder, type APIEmbed } from "discord.js";

export const createEmbed = (
    settings: Omit<APIEmbed, "fields"> & {
        fields: APIEmbed["fields"] | Record<string, string>;
    },
): EmbedBuilder => {
    const { description, title } = settings;
    const fields = getFields(settings.fields);

    if (fields && fields.length > 25)
        throw new Error("Maximum 25 fields on an embed");

    if (description && description.length > 4096)
        throw new Error("Maximum 4096 characters on embed description");

    if (title && title.length > 256)
        throw new Error("Maximum 256 characters on embed title");

    const embed = new EmbedBuilder({
        ...settings,
        fields,
    });
    return embed;
};

const getFields = (
    fields: APIEmbed["fields"] | Record<string, string>,
): APIEmbed["fields"] => {
    if (!fields || Array.isArray(fields)) {
        return fields;
    }

    return Object.entries<string>(fields).map(([name, value]) => ({
        name,
        value,
        inline: true,
    }));
};
