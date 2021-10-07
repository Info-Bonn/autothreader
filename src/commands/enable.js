const { ThreadChannel } = require("../db");

const enable = async (channelName, channelId, guildId, channelMessage) => {
  // look for an existing subscription
  const prevChannel = await ThreadChannel.findOne({
    channelId,
    guildId,
  });
  // error if already enabled
  if (prevChannel) {
    throw new Error(`This Channel is already autothreading`);
  }
  if (!channelMessage) {
    // eslint-disable-next-line no-param-reassign
    channelMessage = "";
  }
  const channelInstance = new ThreadChannel({
    channelName,
    channelId,
    guildId,
    channelMessage,
  });
  await channelInstance.save();
};

module.exports.enable = enable;
