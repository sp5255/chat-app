const Conversation = require("../models/conversation.model");

// TODO: any logged in user shouldn't get any other conversation just by the conversation id or participants
// there user that is logged in should be able to get only it's related converations and same for messages.

exports.getConversationByUser = async ({ participants }) => {
  return Conversation.find().all("participants", participants);
};

exports.getConversationByParticipants = async ({ participants }) => {
  const query = Conversation.find().all("participants", participants);
  const filter = {};
  participants.forEach((element) => {
    filter.$eq = element;
  });

  // query.where("participants").size(participants.length);
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
