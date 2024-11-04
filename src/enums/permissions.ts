import { PermissionFlagsBits, type PermissionsString } from "discord.js";

export const permissionLookup = {
    create_instant_invite: "CreateInstantInvite",
    kick_members: "KickMembers",
    ban_memebrs: "BanMembers",
    administrator: "Administrator",
    manage_channels: "ManageChannels",
    manage_guild: "ManageGuild",
    add_reactions: "AddReactions",
    view_audit_loog: "ViewAuditLog",
    priority_speaker: "PrioritySpeaker",
    stream: "Stream",
    view_channel: "ViewChannel",
    send_messages: "SendMessages",
    send_tss_messages: "SendTTSMessages",
    manage_messages: "ManageMessages",
    embed_links: "EmbedLinks",
    attach_files: "AttachFiles",
    read_message_history: "ReadMessageHistory",
    mention_everyone: "MentionEveryone",
    use_external_emojis: "UseExternalEmojis",
    view_guild_insights: "ViewGuildInsights",
    connect: "Connect",
    speak: "Speak",
    mute_members: "MuteMembers",
    deafen_members: "DeafenMembers",
    move_members: "MoveMembers",
    use_VAD: "UseVAD",
    change_nickname: "ChangeNickname",
    manage_nicknames: "ManageNicknames",
    manage_roles: "ManageRoles",
    manage_webhooks: "ManageWebhooks",
    manage_emojis_and_stickers: "ManageEmojisAndStickers",
    manage_guild_expressions: "ManageGuildExpressions",
    use_application_commands: "UseApplicationCommands",
    request_to_speak: "RequestToSpeak",
    manage_events: "ManageEvents",
    manage_threads: "ManageThreads",
    create_public_threads: "CreatePublicThreads",
    create_private_threads: "CreatePrivateThreads",
    use_external_stickers: "UseExternalStickers",
    send_messages_in_threads: "SendMessagesInThreads",
    use_embedded_activities: "UseEmbeddedActivities",
    moderate_members: "ModerateMembers",
    view_creator_monetization_analytics: "ViewCreatorMonetizationAnalytics",
    use_soundboard: "UseSoundboard",
    create_guild_expressions: "CreateGuildExpressions",
    create_events: "CreateEvents",
    use_external_sounds: "UseExternalSounds",
    send_voice_messages: "SendVoiceMessages",
    send_polls: "SendPolls",
    use_external_apps: "UseExternalApps",
} as const satisfies Record<string, keyof typeof PermissionFlagsBits>;

export type Permission = keyof typeof permissionLookup;

export const intoDiscordPermission = (permission: Permission): PermissionsString => {
    const flagName = permissionLookup[permission];
    return flagName;
};
