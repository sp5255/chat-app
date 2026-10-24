import Conversation from "@/models/conversation.model.js";

// TODO: any logged in user shouldn't get any other conversation just by the conversation id or participants
// there user that is logged in should be able to get only it's related converations and same for messages.

export const getConversationByUser = async ({
  participants,
}: {
  participants: Array<string>;
}) => {
  return Conversation.find().all("participants", participants);
};

export const getConversationByParticipants = async ({
  participants,
}: {
  participants: Array<string>;
}) => {
  const query = Conversation.find().all("participants", participants);
  const filter: any = {};
  participants.forEach((element) => {
    filter.$eq = element;
  });

  // query.where("participants").size(participants.length);
  query.elemMatch("participants", filter);
  return query;
};

export const createConversation = async ({
  participants,
  name,
  lastMessage,
}: {
  participants: Array<string>;
  name: string;
  lastMessage?: string;
}) => {
  const conversation = new Conversation({
    participants,
    name,
    lastMessage,
  });

  await conversation.save();
};
