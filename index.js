// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { example } = require("./src/commands/example");

const { token } = require("./config.json");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

// listener for slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  // switch that runs the correct code for used command
  switch (interaction.commandName) {
    case "example": {
      // defers the reply so that the reply still works normally even if the backend is slower than 3 seconds
      await interaction.deferReply({ ephemeral: true });

      // the toplevel try/catch block that forwards every error to the user
      try {
        // call function
        example();
        await interaction.editReply(``);
      } catch (error) {
        // forwards errors to the user
        await interaction.editReply(
          `There was an error , here is the error message: ${error}`
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
client.login(token);
