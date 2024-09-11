# Events

[Example](../examples/events.ts)

```ts
runBot({
    events: on_message,
});
```

## Terminology

Servers are called Guilds in the discord API due to this being their original name

In the context of a server, a user is called a member. This is because it doesn't make sense that an account can gain
roles etc, but a user in a server can

## Events Table

### Bot Events

| Event          | Discord.js Name                | Description                                                         |
| -------------- | ------------------------------ | ------------------------------------------------------------------- |
| on_ready       | `EventsEnum.ClientReady`       | When you bot first connects                                         |
| on_interaction | `EventsEnum.InteractionCreate` | When the bot is interacted with, e.g. commands, buttons, selections |

### Server Events

| Event                   | Discord.js Name                            | Description                                                        |
| ----------------------- | ------------------------------------------ | ------------------------------------------------------------------ |
| on_guild_created        | `EventsEnum.GuildCreate`                   | When a server is created                                           |
| on_guild_deleted        | `EventsEnum.GuildDelete`                   | When a server is deleted                                           |
| on_guild_updated        | `EventsEnum.GuildUpdate`                   | When a server's details are changed                                |
| on_guild_available      | `EventsEnum.GuildAvailable`                | When a server bcomes avaialble                                     |
| on_guild_unavailable    | `EventsEnum.GuildUnavailable`              | When a server becomes unavailable from a server outage or deletion |
| on_audit_log_updated    | `EventsEnum.GuildAuditLogEntryCreate`      | When a server audit log entry is created                           |
| on_channel_created      | `EventsEnum.ChannelCreate`                 | When a channel is created in a server                              |
| on_channel_deleted      | `EventsEnum.ChannelDelete`                 | When a channel is deleted in a server                              |
| on_channel_updated      | `EventsEnum.ChannelUpdate`                 | When a channel is updated in a server                              |
| on_channel_pins_updated | `EventsEnum.ChannelPinsUpdate`             | When the pins on a channel are changed                             |
| on_role_created         | `EventsEnum.GuildRoleCreate`               | When a role is created                                             |
| on_role_deleted         | `EventsEnum.GuildRoleDelete`               | When a role is deleted                                             |
| on_role_updated         | `EventsEnum.GuildRoleUpdate`               | When a role is updated                                             |
| on_invite_created       | `EventsEnum.InviteCreate`                  | When a server invite is created                                    |
| on_invite_deleted       | `EventsEnum.InviteDelete`                  | When a server invite is deleted                                    |
| on_guild_emoji_created  | `EventsEnum.GuildEmojiCreate`              | When an emoji is added to a server                                 |
| on_guild_emoji_deleted  | `EventsEnum.GuildEmojiDelete`              | When an emoji is removed from a server                             |
| on_guild_emoji_updated  | `EventsEnum.GuildEmojiUpdate`              | When an emoji is updated in a server                               |
| on_sticker_created      | `EventsEnum.GuildStickerCreate`            | When a sticker is added to a server                                |
| on_sticker_deleted      | `EventsEnum.GuildStickerDelete`            | When a sticker is removed from a server                            |
| on_sticked_updated      | `EventsEnum.GuildStickerUpdate`            | When a sticker is updated in a server                              |
| on_event_created        | `EventsEnum.GuildScheduledEventCreate`     | When a server event is created                                     |
| on_event_updated        | `EventsEnum.GuildScheduledEventUpdate`     | When a server event is updated                                     |
| on_event_deleted        | `EventsEnum.GuildScheduledEventDelete`     | When a server event is deleted                                     |
| on_event_user_added     | `EventsEnum.GuildScheduledEventUserAdd`    | When a user subscribes to a server event                           |
| on_event_user_removed   | `EventsEnum.GuildScheduledEventUserRemove` | When a user unsubscribes from a server event                       |
| on_stage_created        | `EventsEnum.StageInstanceCreate`           | When a stage instance is created                                   |
| on_stage_updated        | `EventsEnum.StageInstanceUpdate`           | When a stage instance is updated                                   |
| on_stage_deleted        | `EventsEnum.StageInstanceDelete`           | When a stage instance is deleted                                   |
| on_entitlement_created  | `EventsEnum.EntitlementCreate`             | When an entitlement (paid server) is created                       |
| on_entitlement_deleted  | `EventsEnum.EntitlementDelete`             | When an entitlement (paid server) is deleted                       |
| on_entitlement_updated  | `EventsEnum.EntitlementUpdate`             | When an entitlement (paid server) is updated                       |
| on_automod_rule_created | `EventsEnum.AutoModerationRuleCreate`      | When a server creates an automod rule                              |
| on_automod_rule_deleted | `EventsEnum.AutoModerationRuleDelete`      | When a server deletes an automod rule                              |
| on_automod_rule_updated | `EventsEnum.AutoModerationRuleUpdate`      | When a server updates an automod rule                              |
| on_automod_executed     | `EventsEnum.AutoModerationActionExecution` | When an automod rule is executed                                   |

### User Events

| Event                    | Discord.js Name                      | Description                                                        |
| ------------------------ | ------------------------------------ | ------------------------------------------------------------------ |
| on_member_added          | `EventsEnum.GuildMemberAdd`          | When a user joins a server                                         |
| on_member_removed        | `EventsEnum.GuildMemberRemove`       | When a user leaves a server                                        |
| on_member_updated        | `EventsEnum.GuildMemberUpdate`       | When a user details are changed, such as changing role or nickname |
| on_member_banned         | `EventsEnum.GuildBanAdd`             | When a user is banned                                              |
| on_member_unbanned       | `EventsEnum.GuildBanRemove`          | When a user is unbanned                                            |
| on_presence_updated      | `EventsEnum.PresenceUpdate`          | When a user's discord rich presence updates                        |
| on_typing                | `EventsEnum.TypingStart`             | When a user starts the "is typing" event                           |
| on_member_available      | `EventsEnum.GuildMemberAvailable`    | When a guild member becomes available                              |
| on_members_chunked       | `EventsEnum.GuildMembersChunk`       | TODO                                                               |
| on_intergrations_updated | `EventsEnum.GuildIntegrationsUpdate` | TODO                                                               |

### Message events

TODO: Add `on_message` and `on_bot_message`

| Event                    | Discord.js Name                         | Description                                                     |
| ------------------------ | --------------------------------------- | --------------------------------------------------------------- |
| on_message               | `EventsEnum.MessageCreate`              | When a message is recieved                                      |
| on_message_deleted       | `EventsEnum.MessageDelete`              | When a message is deleted                                       |
| on_message_updated       | `EventsEnum.MessageUpdate`              | When a message is updated                                       |
| on_message_bulk_delete   | `EventsEnum.MessageBulkDelete`          | When several messages are deleted at the same time              |
| on_reaction_add          | `EventsEnum.MessageReactionAdd`         | When a reaction is added to a message                           |
| on_reaction_remove       | `EventsEnum.MessageReactionRemove`      | When a reaction is removed from a message                       |
| on_reaction_reset        | `EventsEnum.MessageReactionRemoveAll`   | When all reactions are cleared off a message                    |
| on_reaction_remove_emoji | `EventsEnum.MessageReactionRemoveEmoji` | When all reactions of a certain emoji are cleared off a message |
| on_thread_created        | `EventsEnum.ThreadCreate`               | When a thread is created                                        |
| on_thread_deleted        | `EventsEnum.ThreadDelete`               | When a thread is deleted                                        |
| on_thread_updated        | `EventsEnum.ThreadUpdate`               | When a thread is updated                                        |
| on_poll_vote             | `EventsEnum.MessagePollVoteAdd`         | When a user vote on a poll                                      |
| on_poll_vote_remove      | `EventsEnum.MessagePollVoteRemove`      | When a user removes a vote on a poll                            |

```

```
