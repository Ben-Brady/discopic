import { Client, Events } from "discord.js";
import { type Command, publishSlashCommands } from "./commands/index.js";
import { type Intent, intoDiscordIntent } from "./enums/intents.js";
import { runInteraction } from "./interactions/run.js";
import { registerEvents, type EventHandlers } from "./events.js";
import { consturctLogging, type LoggingHandlers } from "./logging/index.js";

export type BotSettings = {
    token: string;
    client_id: string;
    intents: Intent[];
    commands: Command<any>[];
    events: EventHandlers;
    logging: Partial<LoggingHandlers> | false;
};

export async function runBot(settings: Partial<BotSettings>): Promise<void> {
    const { start } = createBot(settings);
    await start();
}

export function createBot(initialSettings: Partial<BotSettings>): { start: () => Promise<void>; client: Client } {
    const settings = generateDefaultSettings(initialSettings);
    const logging = consturctLogging(settings.logging);

    const { intents, client_id, commands, events, token } = settings;

    const client = new Client({
        intents: intents.map(intoDiscordIntent),
    });

    client.on(Events.InteractionCreate, interaction => runInteraction({ interaction, logging: logging }));
    client.once(Events.ClientReady, client => {
        if (logging && logging.startup) logging.startup({ client, settings });
    });

    const start = async () => {
        registerEvents(client, events);
        await publishSlashCommands({ token, client_id, commands });
        await client.login(token);
    };

    return { client, start };
}

const generateDefaultSettings = ({
    client_id,
    commands = [],
    events = {},
    intents = [],
    logging = {},
    token,
}: Partial<BotSettings>): BotSettings => {
    commands ??= [];
    events ??= {};
    intents ??= [];
    logging ??= {};

    token ??= process.env["DISCORD_BOT_TOKEN"];
    if (!token) throw new Error("No Discord Token Provided");

    client_id ??= process.env["DISCORD_BOT_CLIENT_ID"];
    if (!client_id) throw new Error("No Discord Client ID Provided");

    commands = commands.sort((a, b) => a.name.localeCompare(b.name));

    return {
        client_id,
        token,
        commands,
        events,
        intents,
        logging,
    };
};
