import { Client } from "discord.js";
import { type Command, type CommandGroup, publishSlashCommands } from "./index.js";
import { runAutocompleteInteraction, runCommandInteraction } from "./interaction.js";
import { defaultCommandLogger, type CommandLogger } from "./logger.js";

export function attachSlashCommands(
    client: Client,
    {
        commands: commandsInput,
        logging,
    }: {
        commands: (Command<any> | CommandGroup)[];
        logging?: CommandLogger | false;
    },
) {
    if (logging === undefined) logging = defaultCommandLogger;
    if (logging === false) logging = undefined;

    let commands = commandsInput.flatMap(v => ("commands" in v ? v.commands : v));
    commands = commands.toSorted((a, b) => a.name.localeCompare(b.name));

    client.on("interactionCreate", async interaction => {
        try {
            if (interaction.isAutocomplete()) await runAutocompleteInteraction(interaction);
            if (interaction.isChatInputCommand()) await runCommandInteraction(interaction, logging);
        } catch (e) {
            console.error(e);
        }
    });

    client.on("ready", async () => {
        if (!client.token) throw new Error("Not Token Found to publish slash commands with");
        if (!client.user) throw new Error("Client has not bot associated with it");

        await publishSlashCommands({
            client,
            token: client.token,
            client_id: client.user.id,
            commands,
        });

        if (commands.length > 0) {
            console.log(`Attached ${commands.length} application (/) commands:`);
            commands.forEach(command => {
                if (command.group) {
                    console.log(` - /${command.group.name}/${command.name}`);
                } else {
                    console.log(` - /${command.name}`);
                }
            });
        }
    });
}
