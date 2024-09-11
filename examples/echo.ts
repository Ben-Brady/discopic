import { createCommand, runBot } from "../src";

const echo = createCommand({
    name: "echo",
    description: "Echos your name",
    parameters: {
        text: {
            type: "string",
            description: "The string to echo back",
        },
    },
    async execute({ ctx, parameters: { text } }) {
        ctx.reply(text);
    },
});

runBot({
    commands: [echo],
});
