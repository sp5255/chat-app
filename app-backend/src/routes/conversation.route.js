const {
  getAllConversationsByUser,
  createConversation,
  getConversationByParti,
} = require("../controller/conversation.controller");

const conversationRoute = require("express").Router();

conversationRoute.get("/all", getAllConversationsByUser);
conversationRoute.get("/part", getConversationByParti);
conversationRoute.post("/new", createConversation);

module.exports = conversationRoute;
