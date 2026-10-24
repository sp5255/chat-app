import { getAllConversationsByUser, createConversation, getConversationByParti } from "@/controller/conversation.controller.js";

const conversationRoute = require("express").Router();

conversationRoute.get("/all", getAllConversationsByUser);
conversationRoute.get("/part", getConversationByParti);
conversationRoute.post("/new", createConversation);

export default conversationRoute;
