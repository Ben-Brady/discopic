import { runBot, createCommand } from "../src";

const helloCommand = createCommand({
    name: "ping",
    description: "Pongs you back",
    async execute({ interaction }) {
        interaction.reply("pong");
    },
});

runBot({
    commands: [helloCommand],
});
