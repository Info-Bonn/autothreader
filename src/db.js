const mongoose = require("mongoose");

// connect to the db
mongoose.connect(
  process.env.DBCONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("DB connected!")
);

// setup the subscription schema
const ThreadChannelSchema = new mongoose.Schema({
  channelName: String,
  channelId: String,
  guildId: String,
  channelMessage: String,
});
// register the schema
const ThreadChannel = mongoose.model("ThreadChannel", ThreadChannelSchema);

module.exports.ThreadChannel = ThreadChannel;
