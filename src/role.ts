import { Guild, Role, type RoleCreateOptions } from "discord.js";

export const upsertRole = async (
    guild: Guild,
    config: RoleCreateOptions,
): Promise<Role> => {
    const existingRole = guild.roles.cache.find(
        role => role.name === config.name,
    );

    if (existingRole) {
        return existingRole;
    } else {
        return await guild.roles.create(config);
    }
};
