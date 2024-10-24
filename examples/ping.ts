import { runBot, createCommand } from "discopic";

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
