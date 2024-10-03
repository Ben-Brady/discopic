import type {
    InteractionDeferReplyOptions,
    InteractionEditReplyOptions,
    InteractionReplyOptions,
    InteractionResponse,
    Message,
    MessagePayload,
    MessageResolvable,
    Snowflake,
} from "discord.js";

type Interaciton = {
    deferReply: (options?: InteractionDeferReplyOptions) => Promise<Message>;
    deleteReply: (message?: MessageResolvable | "@original") => Promise<void>;
    editReply: (options: string | MessagePayload | InteractionEditReplyOptions) => Promise<Message>;
    fetchReply: (message?: (Snowflake & {}) | "@original") => Promise<Message>;
    followUp: (options: string | MessagePayload | InteractionReplyOptions) => Promise<Message>;
    reply: (options: string | MessagePayload | InteractionReplyOptions) => Promise<InteractionResponse>;
};

const a = undefined as unknown as Interaciton;
a.deleteReply("@original");
