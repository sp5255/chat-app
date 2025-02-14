const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  message: { type: String, required: true },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const Message = model("Message", messageSchema);
module.exports = Message;
