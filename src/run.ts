import { Client, Events } from "discord.js";
import { type Command, publishSlashCommands } from "./commands/index.js";
import { type Intent, intoDiscordIntent } from "./enums/intents.js";
import { runInteraction } from "./interactions/run.js";
import { getEvent, type EventHandlers, type EventName } from "./events.js";

type BotSettings = {
    token?: string;
    client_id?: string;
    intents?: Intent[];
    commands?: Command<any>[];
    events?: EventHandlers;
    introduction?: boolean;
};
export async function runBot(settings: BotSettings): Promise<void> {
    const { start } = await createBot(settings);
    await start();
}

export function createBot({
    token,
    client_id,
    intents = [],
    commands = [],
    events = {},
    introduction = true,
}: BotSettings): { start: () => Promise<void>; client: Client } {
    token ??= process.env["DISCORD_BOT_TOKEN"];
    if (!token) throw new Error("No Discord Token Provided");

    client_id ??= process.env["DISCORD_BOT_CLIENT_ID"];
    if (!client_id) throw new Error("No Discord Client ID Provided");

    commands = commands.sort((a, b) => a.name.localeCompare(b.name));

    const client = new Client({
        intents: intents.map(intoDiscordIntent),
    });

    if (introduction) {
        client.once(Events.ClientReady, client => {
            sendIntroduction({ client, intents, commands, events });
        });
    }
    client.on(Events.InteractionCreate, runInteraction);

    return {
        client,
        start: async () => {
            await publishSlashCommands({ token, client_id, commands, logging: introduction });

            await client.login(token);
        },
    };
}

const sendIntroduction = ({
    client,
    intents,
    commands,
    events,
}: {
    client: Client;
    intents: Intent[];
    commands: Command[];
    events: EventHandlers;
}) => {
    // TODO: Make URL support alternative permissions and scopes
    const scopes = ["bot", "applications.commands"];
    if (intents.includes("message_content")) scopes.push("messages.read");
    const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=${scopes.join("%20")}`;

    console.log(`Logged in as ${client?.user?.tag}!`);

    if (commands.length > 0) {
        console.log(`${commands.length} application (/) commands:`);
        commands.forEach(command => console.log(` - /${command.name}`));
    }

    const eventNames = Object.keys(events);
    if (eventNames.length > 0) {
        console.log(`listening for ${eventNames.length} events:`);
        eventNames.forEach(name => console.log(` - ${name}`));
    }

    console.log();
    console.log(`Invite with ${inviteUrl}`);
    console.log();
};
