import { Events } from "discord.js";
import { createBot, runBot } from "../src";
import { EventCallback } from "../src";

// You can specify events using EventCallback
const on_typing: EventCallback<"on_typing"> = typing => {
    console.log(`${typing.member?.user} is typing`);
};

runBot({
    events: {
        on_typing,
        // Or inline,
        on_ready: client => {
            console.log(client.user.displayName);
        },
    },
    intents: ["guilds", "guild_message_typing"],
});
