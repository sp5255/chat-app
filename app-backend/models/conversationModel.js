const { Schema, model } = require("mongoose");
// const User = require("./userModel");
// const Message = require("./messageModel");

const converstionSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  },
});

const Conversation = model("Conversation", converstionSchema);
module.exports = Conversation;
