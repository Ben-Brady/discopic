# Commands

## Creating

```typescript
import { runBot, createCommand } from "../src";

const ping = createCommand({
    // The name used when running it, e.g. /ping
    name: "ping",
    // The description discord uses to show your command, discord requies this
    description: "Pongs you back",
    // The function to run when someone uses this command
    async execute({ ctx }) {
        // Reply to the command, you have to do some form of interaction
        // or discord will give an error to the user.
        await ctx.reply("pong");
    },
});

runBot({
    // Put commands here for the bot to use them
    commands: [ping],
});
```

## Writing your callback


> Note: When your bot restarts, interactions such as buttons, modals, etc will expire.<br/>
> This is most noticable in watch mode where your constnatly restarting your code

| name        | type                            | Description                               |
| ----------- | ------------------------------- | ----------------------------------------- |
| ctx         | `CommandContext`                | Infomation and actions about this command |
| interaction | `discord.js/CommandInteraction` | The discord.js interaction object         |
| parameters  | `CommandParameters`                      | The parameters used in the command        |
