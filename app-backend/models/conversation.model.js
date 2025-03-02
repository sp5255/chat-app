const { Schema, model } = require("mongoose");

const conversationSchema = new Schema({
  participants: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    validate: {
      validator: (participants) => {
        participants = participants.map((userId) => userId.toString());
        if (new Set(participants).size !== participants.length) return false;
        return participants.length > 1;
      },
      message: (props) => {
        props.value = props.value.map((userId) => userId.toString());
        if (new Set(props.value).size !== props.value.length)
          return "participants should be unique";
        return "there should be atlease 1 participant for conversation";
      },
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
  isDeleted: { type: Boolean, default: false },
});

const Conversation = model("Conversation", conversationSchema);
module.exports = Conversation;
