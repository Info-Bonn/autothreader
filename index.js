// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { enable } = require("./src/commands/enable");
const { disable } = require("./src/commands/disable");
const { list } = require("./src/commands/list");
const { ThreadChannel } = require("./src/db");

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", async (message) => {
  if (!message.channel.isText() || message.author.bot) {
    return;
  }

  const channel = await ThreadChannel.findOne({
    channelId: message.channelId,
    guildId: message.guildId,
  });
  if (!channel) {
    return;
  }
  const date = new Date(message.createdTimestamp).toString();
  const thread = await message.startThread({
    name: `${message.author.username}, ${date.slice(0, 15)}`,
    autoArchiveDuration: 1440,
  });
  if (channel.channelMessage) {
    await thread.send(channel.channelMessage);
  }

  await thread.leave();
});

// listener for slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.member.permissions.has("MANAGE_ROLES")) {
    interaction.reply(
      `You don't have manage roles permissions that are required to execute this command.`
    );
    return;
  }
  // switch that runs the correct code for used command
  switch (interaction.commandName) {
    case "enable": {
      // defers the reply so that the reply still works normally even if the backend is slower than 3 seconds
      await interaction.deferReply({ ephemeral: true });
      let channelMessage = "";
      channelMessage = interaction.options.getString("message");
      const channelName = interaction.guild.channels.cache.get(
        interaction.channelId
      ).name;

      // the toplevel try/catch block that forwards every error to the user
      try {
        // call function
        await enable(
          channelName,
          interaction.channelId,
          interaction.guildId,
          channelMessage
        );
        await interaction.editReply(
          `You successfully enabled autothreading in this channel.`
        );
      } catch (error) {
        // forwards errors to the user
        await interaction.editReply(
          `There was an error, here is the error message: ${error}`
        );
      }
      break;
    }
    case "disable": {
      // defers the reply so that the reply still works normally even if the backend is slower than 3 seconds
      await interaction.deferReply({ ephemeral: true });
      // the toplevel try/catch block that forwards every error to the user
      try {
        // calls the unsubscribe function
        await disable(interaction.channelId, interaction.guildId);
        // update the defered reply if the unsubscribe function doesnt error
        await interaction.editReply(
          `You successfully disabled autothreading in this channel.`
        );
      } catch (error) {
        // forwards errors to the user
        await interaction.editReply(
          `There was an error, here is the error message: ${error}`
        );
      }
      break;
    }
    case "listchannels": {
      // defers the reply so that the reply still works normally even if the backend is slower than 3 seconds
      await interaction.deferReply({ ephemeral: true });
      // the toplevel try/catch block that forwards every error to the user
      try {
        // calls the list function
        const commandList = await list(interaction.guildId);
        // update the defered reply with the return value of the list function if the unsubscribe function doesnt error
        interaction.editReply(
          `Here is the list of channels with autothreading enabled: ${commandList}`
        );
      } catch (error) {
        // forwards errors to the user
        await interaction.editReply(
          `There was an error, here is the error message: ${error}`
        );
      }
      break;
    }
    // not really needed because discord only listens for deployed commands
    default:
      break;
  }
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);
