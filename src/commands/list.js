const { ThreadChannel } = require("../db");

const list = async (guildId) => {
  // search the db for all subscriptions in the mentioned channel
  const channels = await ThreadChannel.find({
    guildId,
  });
  // error if there are none
  if (channels.length === 0) {
    throw new Error("There are no channels with autothreading on!");
  }
  // create the list with the subscription type
  let channelList = "";
  channels.forEach((element) => {
    channelList += element.channelName;
    channelList += ", ";
  });
  // remove the last ", "
  channelList = channelList.slice(0, -2);

  return channelList;
};

module.exports.list = list;
