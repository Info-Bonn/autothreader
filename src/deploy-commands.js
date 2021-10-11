const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [];
// get all commands
commands.push(require("./register_commands/enable"));
commands.push(require("./register_commands/disable"));
commands.push(require("./register_commands/list"));

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

if (process.env.GUILDID) {
  // register them with discord as global commands
  rest
    .put(
      Routes.applicationGuildCommands(
        process.env.CLIENTID,
        process.env.GUILDID
      ),
      { body: commands }
    )
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
} else {
  // register them with discord as guild commands
  rest
    .put(Routes.applicationCommands(process.env.CLIENTID), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
}
