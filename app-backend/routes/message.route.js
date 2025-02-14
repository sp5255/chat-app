const router = require("express").Router();

router.get("/", async (req, res) => {
  const users = await User.find({ password: "12345" });
  console.log("users : ", users[0].id);
  const messages = [
    {
      message: "hello",
      senderId: users[0]._id,
    },
    {
      message: "hi",
      senderId: users[1]._id,
    },
  ];

  try {
    messages.forEach(async (message) => {
      const newMessage = new Message(message);
      // await newMessage.save();
    });

    const foundMessages = await Message.find({});
    console.log("found : ", foundMessages);
    const conversation = new Conversation({
      messages: foundMessages.map((msg) => msg._id),
      senderId: users[0]._id,
      receiverId: users[1]._id,
    });
    await conversation.save();
    console.log("saved conversation..");
    res.status(200).json({ message: "added user conversation" });
  } catch (e) {
    console.log("err : ", e);
  }
});

module.exports = router