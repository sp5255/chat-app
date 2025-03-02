const Conversation = require("../models/conversation.model");

exports.getConversationByUser = async ({ participants }) => {
  return Conversation.find().all("participants", participants);
};

exports.getConversationByParticipants = async ({ participants }) => {
  const query = Conversation.find().all("participants", participants);
  const filter = {};
  participants.forEach((element) => {
    filter.$eq = element;
  });

  query.where("participants").size(participants.length);
  query.elemMatch("participants", filter);
  return query;
};

exports.createConversation = async ({ participants, name, lastMessage }) => {
  const conversation = new Conversation({
    participants,
    name,
    lastMessage,
  });

  await conversation.save();
};
