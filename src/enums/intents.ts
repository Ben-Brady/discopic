import { IntentsBitField } from "discord.js";

export const intentLookup = {
    guild_members: "GuildMembers",
    guild_moderation: "GuildModeration",
    guild_bans: "GuildBans",
    guild_emojis_and_stickers: "GuildEmojisAndStickers",
    guild_integrations: "GuildIntegrations",
    guild_webhooks: "GuildWebhooks",
    guild_invites: "GuildInvites",
    guild_voice_states: "GuildVoiceStates",
    guild_presences: "GuildPresences",
    guild_messages: "GuildMessages",
    guild_message_reactions: "GuildMessageReactions",
    guild_message_typing: "GuildMessageTyping",
    direct_messages: "DirectMessages",
    direct_message_reactions: "DirectMessageReactions",
    direct_message_typing: "DirectMessageTyping",
    message_content: "MessageContent",
    guild_scheduled_events: "GuildScheduledEvents",
    automod_configuration: "AutoModerationConfiguration",
    automod_execution: "AutoModerationExecution",
    guild_message_polls: "GuildMessagePolls",
    direct_message_polls: "DirectMessagePolls",
} as const;

export type Intent = keyof typeof intentLookup;

export const intoDiscordIntent = (intent: Intent): IntentsBitField => {
    return new IntentsBitField(intentLookup[intent]);
};
