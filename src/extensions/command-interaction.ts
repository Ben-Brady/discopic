import type { CommandInteraction } from "discord.js";

type isN_functions =
    | "inGuild"
    | "inCachedGuild"
    | "inRawGuild"
    | "isButton"
    | "isAutocomplete"
    | "isChatInputCommand"
    | "isCommand"
    | "isContextMenuCommand"
    | "isMessageComponent"
    | "isMessageContextMenuCommand"
    | "isModalSubmit"
    | "isUserContextMenuCommand"
    | "isSelectMenu"
    | "isAnySelectMenu"
    | "isStringSelectMenu"
    | "isUserSelectMenu"
    | "isRoleSelectMenu"
    | "isMentionableSelectMenu"
    | "isChannelSelectMenu"
    | "isRepliable";

export type ExtendedCommandInteraction = Omit<
    CommandInteraction,
    isN_functions
> & {};
