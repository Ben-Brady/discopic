import { createCommand, runBot } from "discopic";

const echo = createCommand({
    name: "echo",
    description: "Echos your name",
    parameters: {
        text: {
            type: "string",
            description: "The string to echo back",
        },
        pingEveryone: {
            type: "boolean",
            optional: true,
            description: "Ping everyone in this server",
        },
    },
    async execute({ ctx, parameters: { text, pingEveryone } }) {
        if (pingEveryone) {
            await ctx.reply("@everyone " + text);
        } else {
            await ctx.reply(text);
        }
    },
});

runBot({
    commands: [echo],
});
