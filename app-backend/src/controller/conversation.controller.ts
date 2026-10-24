import type { RequestHandler } from "express";

import User from "../models/user.model.js";
import {
  getConversationByUser,
  createConversation as createConversationService,
  getConversationByParticipants,
} from "../services/conversation.service.js";
import { getUserById } from "../services/user.service.js";
import { handleSuccessResponse } from "../utils/handleResponse.js";

// TODO: extend Reqest or RequestHandler interface to suppor the user in req
export const getAllConversationsByUser: RequestHandler = async (
  req: any,
  res,
) => {
  const allConversation = await getConversationByUser({
    participants: [req.user._id],
  });
  res.json(allConversation).status(200);
};

export const createConversation: RequestHandler = async (req: any, res) => {
  try {
    const { user } = req;
    const { participants, name }: { participants: string[]; name: string } =
      req.body || {};
    if (!participants.includes(user._id.toString()))
      return res.status(400).json({
        errors: {
          participants: "participants must include the current user",
        },
      });
    else {
      const users = await User.find({ _id: { $in: participants } });
      if (users.length !== participants.length) {
        return res.status(400).json({
          errors: {
            participants: "invalid user in participants or user doesn't exist",
          },
        });
      }
    }

    // TODO: conversationName depends on the which user is loggedIn and seeing the chats
    // This will be dynamic so shouldn't store in database just find out at the run time and send to the user at request time only
    // Need to change the current logic
    let conversationName = "";
    let receiver = participants.find((id: any) => id != user._id.toString());
    if (participants.length === 1) {
      conversationName = user.username || user.name;
    }
    if (participants?.length <= 2 && receiver) {
      const receiverUser = await getUserById({ id: receiver });
      conversationName = receiverUser?.name || "";
    } else conversationName = name;

    const conversations = await getConversationByParticipants({
      participants,
    });

    if (conversations?.length <= 0) {
      await createConversationService({ participants, name: conversationName });
      handleSuccessResponse(
        { message: "Conversation created successfully", code: 201 },
        res,
      );
      return;
    }
    // throw new Error("custom err");
    res.status(400).json({ message: "Conversation already exist" });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors: any = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send(errors);
    }
    res.status(500).send("Something went wrong");
  }
};

export const getConversationByParti: RequestHandler = async (req, res) => {
  const { participants } = req.body;
  const conversations = await getConversationByParticipants({ participants });
  return res.status(200).json({ conversations });
};
