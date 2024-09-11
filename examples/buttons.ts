import { runBot, createCommand } from "../src";

const button = createCommand({
    name: "button",
    description: "Creates a button",
    async execute({ ctx }) {
        const helloButton = ctx.createButton({
            title: "Hello",
            type: "success",
            callback: ({ interaction }) => {
                interaction.reply("Hello There!");
            },
        });

        await ctx.reply({
            content: "Here's a button",
            components: [helloButton],
        });
    },
});

runBot({
    commands: [button],
});
