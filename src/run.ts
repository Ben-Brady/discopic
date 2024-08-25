import { Client, Events } from "discord.js";
import { runButtonInteraction } from "./button.js";
import { runModalSubmitInteraction } from "./modal.js";
import { type Command, publishSlashCommands } from "./commands/index.js";
import { type Intent, intoDiscordIntent } from "./enums/intents.js";
import {
    runAutocompleteInteraction,
    runCommandInteraction,
} from "./commands/interaction.js";

export async function runBot({
    token,
    client_id,
    intents = [],
    commands = [],
}: {
    token?: string;
    client_id?: string;
    intents?: Intent[];
    commands?: Command<any>[];
}) {
    token ??= process.env["DISCORD_BOT_TOKEN"];
    client_id ??= process.env["DISCORD_BOT_CLIENT_ID"];

    if (!token) throw new Error("No Discord Token Provided");
    if (!client_id) throw new Error("No Discord Client ID Provided");

    const client = new Client({
        intents: intents.map(intoDiscordIntent),
    });

    client.once(Events.ClientReady, client => {
        console.log(`Logged in as ${client.user.tag}!`);

        // TODO: Make URL support alternative permissions and scopes
        const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot%20applications.commands`;
        console.log(`Invite Url: ${inviteUrl}`);
    });

    client.on(Events.InteractionCreate, interation => {
        try {
            if (interation.isButton()) runButtonInteraction(interation);
            if (interation.isModalSubmit())
                runModalSubmitInteraction(interation);
            if (interation.isChatInputCommand())
                runCommandInteraction(interation);
            if (interation.isAutocomplete())
                runAutocompleteInteraction(interation);
        } catch (err: unknown) {
            console.log("Interaction Failed");
            console.error(err);
        }
    });

    await publishSlashCommands(token, client_id, commands);
    await client.login(token);
}
