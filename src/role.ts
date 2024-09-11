import { Guild, Role, type RoleCreateOptions } from "discord.js";

/**
 * Create a role, if it already exists return it
 * @param {Guild} guild
 * @param {Config} config
 * @returns {Promise<Role>}
 */
export const upsertRole = async (guild: Guild, config: RoleCreateOptions): Promise<Role> => {
    const existingRole = guild.roles.cache.find(role => role.name === config.name);

    if (existingRole) {
        return existingRole;
    } else {
        return await guild.roles.create(config);
    }
};
