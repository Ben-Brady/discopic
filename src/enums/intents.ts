import { IntentsBitField } from "discord.js";

export type Intent =
    | "GuildMembers"
    | "GuildModeration"
    | "GuildBans"
    | "GuildEmojisAndStickers"
    | "GuildIntegrations"
    | "GuildWebhooks"
    | "GuildInvites"
    | "GuildVoiceStates"
    | "GuildPresences"
    | "GuildMessages"
    | "GuildMessageReactions"
    | "GuildMessageTyping"
    | "DirectMessages"
    | "DirectMessageReactions"
    | "DirectMessageTyping"
    | "MessageContent"
    | "GuildScheduledEvents"
    | "AutoModerationConfiguration"
    | "AutoModerationExecution"
    | "GuildMessagePolls"
    | "DirectMessagePolls";

export const intoDiscordIntent = (intent: Intent): IntentsBitField => {
    return new IntentsBitField(intent);
};
