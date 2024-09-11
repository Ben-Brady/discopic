import { runBot, createCommand } from "../src";

const ping = createCommand({
    name: "ping",
    description: "Pongs you back",
    async execute({ ctx }) {
        ctx.reply("pong");
    },
});

runBot({
    commands: [ping],
});
