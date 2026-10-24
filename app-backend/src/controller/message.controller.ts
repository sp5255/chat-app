import type { RequestHandler } from "express";
import { getConversationByUser } from "../services/conversation.service.js";
import {
  createMessage,
  getMessageByConversationId,
} from "../services/message.service.js";
import { handleSuccessResponse } from "../utils/handleResponse.js";

export const createNewMessage: RequestHandler = async (req, res) => {
  const { conversationId, message, senderId } = req.body || {};
  try {
    await createMessage({ conversationId, senderId, message });
    handleSuccessResponse(
      { message: "message created successfully", code: 201 },
      res,
    );
  } catch (e) {}
};

export const getConversationMessages: RequestHandler<{
  conversationId: string;
}> = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await getMessageByConversationId(conversationId);
    return res.status(200).json({ messages });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
