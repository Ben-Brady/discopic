import type { Client } from "discord.js";

export const createInviteUrl = (client: Client) => {
    const client_id = client.application?.id;
    if (!client_id) return "";

    const intents = client.options.intents;

    // TODO: Make URL support alternative permissions and scopes
    const scopes = ["bot", "applications.commands"];
    if (intents.has("MessageContent")) scopes.push("messages.read");

    return `https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=0&scope=${scopes.join("%20")}`;
};
