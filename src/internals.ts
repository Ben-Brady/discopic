import type { Client } from "discord.js";
import type { Command } from "./commands/command.js";

export type DiscopicInterals = {
    attachedListeners: boolean;
    commands: Command[];
};

export function getDiscopicInternals(client: Client): DiscopicInterals {
    if ("DISCOPIC_INTERNALS" in client) return client.DISCOPIC_INTERNALS as DiscopicInterals;

    const internals: DiscopicInterals = {
        attachedListeners: false,
        commands: [],
    };

    //@ts-expect-error, assigning to static type
    client.DISCOPIC_INTERNALS = internals;
    return internals;
}
