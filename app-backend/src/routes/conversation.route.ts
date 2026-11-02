import {
  getAllConversationsByUser,
  createConversation,
  getConversationByParti,
} from "@/controller/conversation.controller";

import { Router } from "express";
const conversationRoute = Router();

conversationRoute.get("/all", getAllConversationsByUser);
conversationRoute.get("/part", getConversationByParti);
conversationRoute.post("/new", createConversation);

export default conversationRoute;
