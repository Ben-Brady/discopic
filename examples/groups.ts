import { runBot, createCommand, createCommandGroup } from "../src";

const pingGroup = createCommandGroup({
    name: "shout",
    description: "A bunch of shout commands",
});

const pingCommand = createCommand({
    name: "ping",
    description: "Pongs you back",
    group: pingGroup,
    async execute({ ctx }) {
        ctx.reply("pong");
    },
});

const hiCommand = createCommand({
    name: "hi",
    description: "Says hello!",
    group: pingGroup,
    async execute({ ctx }) {
        ctx.reply("Hello");
    },
});

runBot({
    commands: [pingCommand, hiCommand],
});
