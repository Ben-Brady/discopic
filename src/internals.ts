import type { Client } from "discord.js";

export type DiscopicInterals = {
    attachedListeners: boolean;
};

export function getDiscopicInternals(client: Client): DiscopicInterals {
    if ("DISCOPIC_INTERNALS" in client) return client.DISCOPIC_INTERNALS as DiscopicInterals;

    const internals: DiscopicInterals = {
        attachedListeners: false,
    };

    //@ts-expect-error, assigning to static type
    client.DISCOPIC_INTERNALS = internals;
    return internals;
}
