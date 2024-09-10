import { createCommand, reply, runBot } from "../src";

const echo = createCommand({
    name: "echo",
    description: "Echos your name",
    parameters: {
        text: {
            type: "string",
            description: "The string to echo back",
        },
    },
    async execute({ interaction, parameters: { text } }) {
        reply(interaction, text);
    },
});

runBot({
    commands: [echo],
});
