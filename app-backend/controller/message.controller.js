const { getConversationByUser } = require("../services/conversation.service");
const {
  createMessage,
  getMessageByConversationId,
} = require("../services/message.service");
const { handleSuccessResponse } = require("../utils/handleResponse");

exports.createNewMessage = async (req, res) => {
  const { conversationId, message, senderId } = req.body || {};
  try {
    const conversation = await getConversationByUser();
    await createMessage({ conversationId, senderId, message });
    handleSuccessResponse(
      { message: "message created successfully", code: 201 },
      res,
    );
  } catch (e) {}
};

exports.getConversationMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await getMessageByConversationId(conversationId);
    return res.status(200).json({ messages });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
