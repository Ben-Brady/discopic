# Discopic

> npm install discopic discord.js

> yarn add discopic discord.js

> bun add discopic discord.js

Note: Commands are loaded client side, if a command hasn't updated try refreshing your discord (Ctrl + R)

## Enviroment Variables

Use can use DISCORD_BOT_TOKEN or DISCORD_BOT_CLIENT_ID enviroment variables instead of passing to runBot,
this helps to keep the confirugation out of your code.

## Bot Introduction

By default the bot will print text to the console whilst setting up, this can be disabled with runBot({introduction: false})

## Command Error

If you need to error during a command, throw CommandFailedError and it will be returns to the user as a message.
