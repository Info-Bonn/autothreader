const { SlashCommandBuilder } = require("@discordjs/builders");

// build the command with a name and description
const command = new SlashCommandBuilder()
  .setName("disable")
  .setDescription("Disable autothreading in this channel!");

module.exports = command.toJSON();
