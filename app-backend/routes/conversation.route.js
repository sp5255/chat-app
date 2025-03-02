const {
  getAllConversationsByUser,
  createConversation,
} = require("../controller/conversation.controller");

const conversationRoute = require("express").Router();

conversationRoute.get("/all", getAllConversationsByUser);
conversationRoute.post("/new", createConversation);

module.exports = conversationRoute;
