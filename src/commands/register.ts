import {
    REST,
    Routes,
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    type SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import { registerCommand } from "../interactions/command.js";
import type { Command, CommandGroup } from "./command.js";
import { addOptionToCommand } from "./parameters.js";
import { getTempStore, setTempStore } from "../utils/store.js";
import { validateCommandName, validateCommandParameter } from "../verify.js";
import { intoDiscordPermission } from "../enums/permissions.js";

export type CommandBuilder =
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    | SlashCommandSubcommandBuilder;

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
    const body = createCommandsBody(commands);

    const storeKey = `${client_id}-application-commands`;
    const uploadJson = JSON.stringify(body);
    const lastUpload = getTempStore(storeKey);

    if (lastUpload !== uploadJson) {
        await rest.put(Routes.applicationCommands(client_id), { body });
        setTempStore(storeKey, uploadJson);
    }
}
function createCommandsBody(commands: Command[]): (CommandBuilder | SlashCommandSubcommandsOnlyBuilder)[] {
    const groupLookup = Object.fromEntries(
        commands
            .map(cmd => cmd.group)
            .filter(group => !!group)
            .map(group => [group.name, createCommandGroup(group)]),
    );
    const groups = Object.values(groupLookup);

    const commandObjs = commands
        .map(settings => {
            if (settings.group) {
                const group = groupLookup[settings.group.name];
                group.addSubcommand(builder => applyToCommandBuilder(settings, builder));
                return null;
            }

            return createSlashCommand(settings);
        })
        .filter(v => !!v);

    return [...groups, ...commandObjs];
}

function createSlashCommand(command: Command): CommandBuilder {
    const builder = command.additional_data ?? new SlashCommandBuilder();
    applyToCommandBuilder(command, builder);
    return builder;
}

function applyToCommandBuilder<T extends CommandBuilder>(command: Command, builder: T): T {
    validateCommandName(command.name);

    builder.setName(command.name);
    builder.setDescription(command.description ?? "");
    if ("setDMPermission" in builder) builder.setDMPermission(!command.serverOnly);
    if ("setNSFW" in builder) builder.setNSFW(command.nsfw ?? false);

    if (command.parameters) {
        const parameters = Object.entries(command.parameters);
        parameters.map(([name]) => {
            validateCommandParameter(name);
        });

        parameters.forEach(([name, parameter]) => addOptionToCommand(builder, name, parameter));
    }

    return builder;
}

function createCommandGroup(command: CommandGroup): SlashCommandBuilder {
    const commandObj = command.additional_data ?? new SlashCommandBuilder();

    validateCommandName(command.name);
    commandObj
        .setName(command.name)
        .setDescription(command.description ?? "")
        .setDMPermission(!command.serverOnly)
        .setNSFW(command.nsfw ?? false);

    if (command.permissions) {
        const permissionBits = intoDiscordPermission(command.permissions);
        commandObj.setDefaultMemberPermissions(permissionBits);
    }

    return commandObj;
}
