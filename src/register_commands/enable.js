const { SlashCommandBuilder } = require("@discordjs/builders");

// build the command with a name and description
const command = new SlashCommandBuilder()
  .setName("enable")
  .setDescription("Enable autothreading in this channel!");

// add the needed options
command.addStringOption((option) =>
  option
    .setName("message")
    .setDescription("The message that will be posted into every new Thread")
);

module.exports = command.toJSON();
