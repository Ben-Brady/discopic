import { ChannelType as DiscordChannelType } from "discord.js";

export type ChannelType =
    | "GuildText"
    | "DM"
    | "GuildVoice"
    | "GroupDM"
    | "GuildCategory"
    | "GuildAnnouncement"
    | "AnnouncementThread"
    | "PublicThread"
    | "PrivateThread"
    | "GuildStageVoice"
    | "GuildDirectory"
    | "GuildForum"
    | "GuildMedia"
    | "GuildNews"
    | "GuildNewsThread"
    | "GuildPublicThread"
    | "GuildPrivateThread";

export const intoDiscordChannelType = (
    type: ChannelType,
): DiscordChannelType => {
    return DiscordChannelType[type];
};
