import type { Client, CommandInteraction } from "discord.js";
import { defaultCommandLogger } from "./command.js";
import type { CommandParameters } from "../commands/command.js";
import type { BotSettings } from "../run.js";
import { defaultStartupLogger } from "./startup.js";

export type LoggingHandlers = {
    command: CommandLogger | false;
    startup: StartupLogger | false;
};

export type CommandLogger = (config: {
    interaction: CommandInteraction;
    parameters: CommandParameters;
    error?: Error;
}) => void;

export type StartupLogger = (config: { client: Client<true>; settings: BotSettings }) => void;

export const consturctLogging = (handlers: Partial<LoggingHandlers> | false): LoggingHandlers => {
    if (handlers === false) {
        return {
            command: false,
            startup: false,
        };
    }

    return {
        command: handlers.command ?? defaultCommandLogger,
        startup: handlers.startup ?? defaultStartupLogger,
    };
};
