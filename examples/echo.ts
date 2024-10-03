import { createCommand, runBot } from "../src";

const echo = createCommand({
    name: "echo",
    description: "Echos your name",
    parameters: {
        asdf: {
            type: "integer",
            optional: true,
            description: "The string to echo back",
        },
    },
    async execute({ ctx, parameters: { asdf } }) {
        ctx.reply(text);
    },
});

runBot({
    commands: [echo],
});
