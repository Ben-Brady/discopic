import { Client, Events as EventsEnum, type ClientEvents as ClientEventsLookup } from "discord.js";
import { entries } from "./utils/entires.js";

const eventsLookup = {
    on_permission_update: EventsEnum.ApplicationCommandPermissionsUpdate,
    on_ready: EventsEnum.ClientReady,
    on_audit_log_updated: EventsEnum.GuildAuditLogEntryCreate,
    on_entitlement_created: EventsEnum.EntitlementCreate,
    on_entitlement_deleted: EventsEnum.EntitlementDelete,
    on_entitlement_updated: EventsEnum.EntitlementUpdate,
    on_automod_executed: EventsEnum.AutoModerationActionExecution,
    on_automod_rule_created: EventsEnum.AutoModerationRuleCreate,
    on_automod_rule_deleted: EventsEnum.AutoModerationRuleDelete,
    on_automod_rule_updated: EventsEnum.AutoModerationRuleUpdate,
    on_guild_available: EventsEnum.GuildAvailable,
    on_guild_unavailable: EventsEnum.GuildUnavailable,
    on_guild_created: EventsEnum.GuildCreate,
    on_guild_deleted: EventsEnum.GuildDelete,
    on_guild_updated: EventsEnum.GuildUpdate,
    on_member_added: EventsEnum.GuildMemberAdd,
    on_member_removed: EventsEnum.GuildMemberRemove,
    on_member_updated: EventsEnum.GuildMemberUpdate,
    on_member_available: EventsEnum.GuildMemberAvailable,
    on_members_chunked: EventsEnum.GuildMembersChunk,
    on_intergrations_updated: EventsEnum.GuildIntegrationsUpdate,
    on_role_created: EventsEnum.GuildRoleCreate,
    on_role_deleted: EventsEnum.GuildRoleDelete,
    on_role_updated: EventsEnum.GuildRoleUpdate,
    on_invite_created: EventsEnum.InviteCreate,
    on_invite_deleted: EventsEnum.InviteDelete,
    on_guild_emoji_created: EventsEnum.GuildEmojiCreate,
    on_guild_emoji_deleted: EventsEnum.GuildEmojiDelete,
    on_guild_emoji_updated: EventsEnum.GuildEmojiUpdate,
    on_member_banned: EventsEnum.GuildBanAdd,
    on_member_unbanned: EventsEnum.GuildBanRemove,
    on_channel_created: EventsEnum.ChannelCreate,
    on_channel_deleted: EventsEnum.ChannelDelete,
    on_channel_updated: EventsEnum.ChannelUpdate,
    on_channel_pins_updated: EventsEnum.ChannelPinsUpdate,
    on_message: EventsEnum.MessageCreate,
    on_message_deleted: EventsEnum.MessageDelete,
    on_message_updated: EventsEnum.MessageUpdate,
    on_message_bulk_delete: EventsEnum.MessageBulkDelete,
    on_reaction_add: EventsEnum.MessageReactionAdd,
    on_reaction_remove: EventsEnum.MessageReactionRemove,
    on_reaction_reset: EventsEnum.MessageReactionRemoveAll,
    on_reaction_remove_emoji: EventsEnum.MessageReactionRemoveEmoji,
    on_poll_vote: EventsEnum.MessagePollVoteAdd,
    on_poll_vote_remove: EventsEnum.MessagePollVoteRemove,
    on_thread_created: EventsEnum.ThreadCreate,
    on_thread_deleted: EventsEnum.ThreadDelete,
    on_thread_updated: EventsEnum.ThreadUpdate,
    on_sticker_created: EventsEnum.GuildStickerCreate,
    on_sticker_deleted: EventsEnum.GuildStickerDelete,
    on_sticked_updated: EventsEnum.GuildStickerUpdate,
    on_presence_updated: EventsEnum.PresenceUpdate,
    on_typing: EventsEnum.TypingStart,
    on_interaction: EventsEnum.InteractionCreate,
    on_stage_created: EventsEnum.StageInstanceCreate,
    on_stage_updated: EventsEnum.StageInstanceUpdate,
    on_stage_deleted: EventsEnum.StageInstanceDelete,
    on_event_created: EventsEnum.GuildScheduledEventCreate,
    on_event_updated: EventsEnum.GuildScheduledEventUpdate,
    on_event_deleted: EventsEnum.GuildScheduledEventDelete,
    on_event_user_added: EventsEnum.GuildScheduledEventUserAdd,
    on_event_user_removed: EventsEnum.GuildScheduledEventUserRemove,
    // shard_disconnected: EventsEnum.ShardDisconnect,
    // shard_errored: EventsEnum.ShardError,
    // shard_reconnecting: EventsEnum.ShardReconnecting,
    // shard_ready: EventsEnum.ShardReady,
    // shard_resumed: EventsEnum.ShardResume,

    // cache_sweep: EventsEnum.CacheSweep,
    // invalidated: EventsEnum.Invalidated,

    // error: EventsEnum.Error,
    // warn: EventsEnum.Warn,
    // debug: EventsEnum.Debug,
    // raw: EventsEnum.Raw,
    // vc_fallover: EventsEnum.VoiceServerUpdate,

    on_sync_channel_threads: EventsEnum.ThreadListSync,
    on_thread_joined: EventsEnum.ThreadMemberUpdate,
    on_thread_members_updated: EventsEnum.ThreadMembersUpdate,
    on_user_updatd: EventsEnum.UserUpdate,
    on_vc_update: EventsEnum.VoiceStateUpdate,
    on_webhooks_updated: EventsEnum.WebhooksUpdate,
} as const satisfies Record<string, keyof ClientEventsLookup>;

export type EventName = keyof typeof eventsLookup;
type EventValue<T extends EventName> = (typeof eventsLookup)[T];
type EventParameters<T extends EventName> = ClientEventsLookup[EventValue<T>] extends never
    ? []
    : ClientEventsLookup[EventValue<T>];
export type EventCallback<TEvent extends EventName> = (...args: EventParameters<TEvent>) => Promise<void> | void;

export type EventHandlers = Partial<{ [P in EventName]: EventCallback<P> }>;
export const getEvent = <T extends EventName>(name: T): EventValue<T> => eventsLookup[name];

export const registerEvents = (client: Client, events: EventHandlers) => {
    entries(events).map(([name, callback]) => {
        const event = getEvent(name);
        //@ts-expect-error, can't cast
        client.on(event, callback);
    });
};
