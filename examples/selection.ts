import { runBot, createCommand } from "../src";

const select = createCommand({
    name: "select",
    description: "Creates a string dropdown",
    async execute({ ctx }) {
        const dropdown = ctx.createStringSelection({
            options: {
                Apple: "apple",
                Pear: "pear",
                Banana: "Banana",
            },
            default: "Apple",
            onSelect: async ({ interaction, selected }) => {
                await interaction.reply(`You've selected: ${selected.join(", ")}`);
            },
        });

        await ctx.reply({
            content: "Here's a selection box",
            components: [dropdown],
        });
    },
});

runBot({
    commands: [select],
});
