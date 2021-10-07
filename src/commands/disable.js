const { ThreadChannel } = require("../db");

const disable = async (channelId, guildId) => {
  // deleted the subscription
  const response = await ThreadChannel.deleteOne({
    channelId,
    guildId,
  });
  // if the deletedCount is 0 then it didnt exist so it errors
  if (response.deletedCount === 0) {
    throw new Error(
      `You have not disabled autothreading in this channel, maybe it was not enabled in the first place!`
    );
  }
};

module.exports.disable = disable;
