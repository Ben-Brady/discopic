import type { Intent } from "../enums/intents.js";
import type { StartupLogger } from "./index.js";

export const defaultStartupLogger: StartupLogger = ({ client, settings }) => {
    console.log(`Logged in as ${client.user.displayName}!`);

    const commands = settings.commands;
    if (commands && commands.length > 0) {
        console.log(`${commands.length} application (/) commands:`);
        commands.forEach(command => {
            if (command.group) {
                console.log(` - /${command.group.name}/${command.name}`);
            } else {
                console.log(` - /${command.name}`);
            }
        });
    }

    const events = Object.keys(settings.events);
    if (events.length > 0) {
        console.log(`listening for ${events.length} events:`);
        events.forEach(name => console.log(` - ${name}`));
    }

    const inviteUrl = generateInviteUrl(settings.client_id, settings.intents);
    console.log();
    console.log(`Invite with ${inviteUrl}`);
    console.log();
};

const generateInviteUrl = (client_id: string, intents: Intent[]) => {
    // TODO: Make URL support alternative permissions and scopes
    const scopes = ["bot", "applications.commands"];
    if (intents.includes("message_content")) scopes.push("messages.read");
    return `https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=0&scope=${scopes.join("%20")}`;
};
