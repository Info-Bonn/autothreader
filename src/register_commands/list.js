const { SlashCommandBuilder } = require("@discordjs/builders");
// build the command with a name and description
const command = new SlashCommandBuilder()
  .setName("listchannels")
  .setDescription(
    "List all channel on this server that have autothreading enabled!"
  );

module.exports = command.toJSON();
