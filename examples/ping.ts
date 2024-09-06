import { runBot, createCommand, reply } from "../src";

const helloCommand = createCommand({
    name: "ping",
    description: "Pongs you back",
    async execute({ interaction }) {
        reply(interaction, "pong");
    },
});

runBot({
    commands: [helloCommand],
});
