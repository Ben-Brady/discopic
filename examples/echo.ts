import { createCommand, runBot } from "../src";

const helloCommand = createCommand({
    name: "echo",
    description: "Echos your name",
    parameters: {
        text: {
            type: "string",
            description: "The string to echo back",
        },
    },
    async execute({ interaction }) {
        interaction.reply("pong");
    },
});

runBot({
    commands: [helloCommand],
});
