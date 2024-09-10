import { runBot, createCommand, reply } from "../src";

const ping = createCommand({
    name: "ping",
    description: "Pongs you back",
    async execute({ interaction }) {
        reply(interaction, "pong");
    },
});

runBot({
    commands: [ping],
});
