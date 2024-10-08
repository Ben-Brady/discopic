import { Client } from "discord.js";
import { createBaseContext, type BaseContext } from "./base.js";

export type ButtonContext = BaseContext;

export const createButtonContext = (client: Client): ButtonContext => {
    return {
        ...createBaseContext(client),
    };
};
