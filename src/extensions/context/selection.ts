import { Client } from "discord.js";
import { createBaseContext, type BaseContext } from "./base.js";

export type SelectionContext = BaseContext;

export const createSelectContext = (client: Client): SelectionContext => {
    return {
        ...createBaseContext(client),
    };
};
