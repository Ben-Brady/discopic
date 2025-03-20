# Discopic

```ts
import { runBot, createCommand } from "discopic";

const ping = createCommand({
    name: "ping",
    description: "Pongs you back",
    async execute({ ctx }) {
        ctx.reply("pong");
    },
});

runBot({
    token: "SECRET_TOKEN",
    client_id: 0800_00_1066,
    commands: [ping],
});
```

`npm install discopic discord.js`


## Documentation

Coming Soon... (Probably Never)

> Note: Commands are loaded client side, if a command hasn't updated try refreshing your discord (Ctrl + R)

## Enviroment Variables

Use can use DISCORD_BOT_TOKEN or DISCORD_BOT_CLIENT_ID enviroment variables instead of passing to runBot,
this helps to keep the confirugation out of your code.

## Command Error

If you need to error during a command, throw CommandFailedError and it will be returns to the user as a message.
