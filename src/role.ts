import { Guild, Role, type RoleCreateOptions } from "discord.js";

/**
 * Create a role with certain settings, if it already exists return it
 */
export const upsertRole = async (guild: Guild, config: RoleCreateOptions): Promise<Role> => {
    const existingRole = guild.roles.cache.find(role => role.name === config.name);

    if (existingRole) {
        return existingRole;
    } else {
        return await guild.roles.create(config);
    }
};
