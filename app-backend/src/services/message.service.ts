import Message from "@/models/message.model";


export const createMessage = async ({
  conversationId,
  message,
  senderId,
}: {
  conversationId: string;
  message: string;
  senderId: string;
}) => {
  const messageToBeSaved = new Message({
    conversationId,
    message,
    senderId,
  });

  await messageToBeSaved.save();
};

export const getMessageByConversationId = async (conversationId: string) => {
  const query = await Message.find({ conversationId });
  console.log("query : ", query);
  return query;
};
