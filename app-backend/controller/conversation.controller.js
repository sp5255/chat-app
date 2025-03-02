const User = require("../models/user.model");
const {
  getConversationByUser,
  createConversation,
  getConversationByParticipants,
} = require("../services/conversation.service");
const { getUserById } = require("../services/user.service");
const { handleSuccessResponse } = require("../utils/handleResponse");

exports.getAllConversationsByUser = async (req, res) => {
  const allConversation = await getConversationByUser({
    participants: [req.user._id],
  });
  res.json(allConversation).status(200);
};

exports.createConversation = async (req, res) => {
  try {
    const { user } = req;
    const { participants, name } = req.body || {};
    if (!participants.includes(user._id.toString()))
      return res.status(400).json({
        errors: {
          participants: "participants must include the current user",
        },
      });
    else {
      const users = await User.find({ _id: { $in: participants } });
      console.log("users : ", users);
      if (users.length !== participants.length) {
        return res.status(400).json({
          errors: {
            participants: "invalid user in participants or user doesn't exist",
          },
        });
      }
    }

    let conversationName;
    let receiver = participants.find((id) => id != user._id.toString());
    if (participants.length === 1) {
      conversationName = `${user.firstName} ${user.lastName}`;
    }
    if (participants?.length <= 2 && receiver) {
      const receiverUser = await getUserById({ id: receiver });
      conversationName = `${receiverUser.firstName} ${receiverUser.lastName}`;
    } else conversationName = name;

    const conversations = await getConversationByParticipants({
      participants,
    });

    if (conversations?.length <= 0) {
      await createConversation({ participants, name: conversationName });
      handleSuccessResponse(
        { message: "Conversation created successfully" },
        res
      );
      return;
    }
    // throw new Error("custom err");
    res.status(400).json({ message: "Conversation already exist" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send({ errors });
    }
    res.status(500).send("Something went wrong");
  }
};
