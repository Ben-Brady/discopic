import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { registerCommand } from "./interaction.js";
import type { Command, CommandBuilder } from "./types.js";
import { addOptionToCommand } from "./parameters.js";

export async function publishSlashCommands(
    token: string,
    client_id: string,
    commands: Command<any>[],
) {
    console.log(`Loading ${commands.length} application (/) commands:`);
    commands.forEach(command => console.log(` - /${command.name}`));

    commands.forEach(registerCommand);

    const rest = new REST({ version: "10" }).setToken(token);
    const body = commands
        .map(command => createCommandObject(command))
        .map(command => command.toJSON());

    await rest.put(Routes.applicationCommands(client_id), { body });
}

function createCommandObject(command: Command): CommandBuilder {
    const commandObj = command.additional_data ?? new SlashCommandBuilder();

    commandObj.setName(command.name);
    commandObj.setDescription(command.description ?? "");
    commandObj.setNSFW(command.nsfw ?? false);

    if (command.parameters) {
        const parameters = Object.entries(command.parameters);
        parameters.forEach(([name, parameter]) =>
            addOptionToCommand(commandObj, name, parameter),
        );
    }

    return commandObj;
}
