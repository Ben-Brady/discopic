import { runBot, createCommand, ButtonSettings, reply } from "../src";

const helloCommand = createCommand({
    name: "button",
    description: "Creates a button",
    async execute({ interaction }) {
        const helloButton = {
            title: "Hello",
            type: "success",
            callback: iteraction => {
                iteraction.reply("Hello There!");
            },
        } satisfies ButtonSettings;

        await reply(interaction, {
            content: "Here's a button",
            buttons: [helloButton],
        });
    },
});

runBot({
    commands: [helloCommand],
});
