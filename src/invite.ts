import type { Client } from "discord.js";

export const createInviteUrl = (client: Client): string | undefined => {
    const client_id = client.user?.id;
    if (!client_id) return undefined;

    const intents = client.options.intents;

    // TODO: Make URL support alternative permissions and scopes
    const scopes = ["bot", "applications.commands"];
    if (intents.has("MessageContent")) scopes.push("messages.read");
    if (intents.has("Guilds")) scopes.push("guilds");

    return `https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=0&scope=${scopes.join("%20")}`;
};
