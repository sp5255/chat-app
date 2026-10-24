const Message = require("../models/message.model");

exports.createMessage = async ({ conversationId, message, senderId }) => {
  const messageToBeSaved = new Message({
    conversationId,
    message,
    senderId,
  });

  await messageToBeSaved.save();
};

exports.getMessageByConversationId = async (conversationId) => {
  const query = await Message.find({ conversationId });
  console.log("query : ", query);
  return query;
};
