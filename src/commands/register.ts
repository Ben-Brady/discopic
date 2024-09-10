import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { registerCommand } from "./interaction.js";
import type { Command, CommandBuilder } from "./types.js";
import { addOptionToCommand } from "./parameters.js";
import { getTempStore, setTempStore } from "../utils/store.js";
import { assertValidCommandName, assertValidCommandParameter } from "../verify.js";

export async function publishSlashCommands({
    token,
    client_id,
    commands,
}: {
    token: string;
    client_id: string;
    commands: Command<any>[];
}) {
    commands.forEach(registerCommand);

    const rest = new REST({ version: "10" }).setToken(token);
    const body = commands.map(command => createCommandObject(command)).map(command => command.toJSON());

    const storeKey = `${client_id}-application-commands`;
    const uploadJson = JSON.stringify(body);
    const lastUpload = getTempStore(storeKey);

    if (lastUpload !== uploadJson) {
        await rest.put(Routes.applicationCommands(client_id), { body });
        setTempStore(storeKey, uploadJson);
    }
}

function createCommandObject(command: Command): CommandBuilder {
    const commandObj = command.additional_data ?? new SlashCommandBuilder();

    assertValidCommandName(command.name);
    commandObj
        .setName(command.name)
        .setDescription(command.description ?? "")
        .setDMPermission(!command.serverOnly)
        .setNSFW(command.nsfw ?? false);

    if (command.parameters) {
        const parameters = Object.entries(command.parameters);
        parameters.map(([name]) => {
            assertValidCommandParameter(name);
        });

        parameters.forEach(([name, parameter]) => addOptionToCommand(commandObj, name, parameter));
    }

    return commandObj;
}
