const { Schema, model } = require("mongoose");

const conversationSchema = new Schema({
  participants: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    validate: (arr) => {
      return arr.length > 1;
    },
  },
  name: {
    type: String,
    required: true,
  },
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  },
  createAt: { type: Date, default: Date.now },
});

const Conversation = model("Conversation", conversationSchema);
module.exports = Conversation;
