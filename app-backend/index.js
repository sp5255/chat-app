const express = require("express");
// const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const Message = require("./models/messageModel");
const Conversation = require("./models/conversationModel");
const PORT = 3000;
const SECRET_KEY = "process.env.JWT_SECRET";
const app = express();

const logger = (req, _, next) => {
  console.log(req.method, req.path);
  next();
};
app.use(express.json());
app.use(logger);

const dbUrl =
  "mongodb+srv://user1:yRkWrr20JAo8bQXP@cluster0.oyewr.mongodb.net/chatAppDb?retryWrites=true&w=majority&appName=Cluster0";

(async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("connected to db");
  } catch (err) {
    console.log("error connecting mongo db", err);
  }
})();

app.get("/", (_, res) => {
  res.status(200).json({
    message: "working fine",
  });
});

app.get("/users", async (_, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params || {};
  const user = await User.findById(id);
  res.status(200).json(user);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  //   const found = await bcrypt.compare(password ?? "", user.password ?? "");

  if (password != user.password) {
    return res
      .status(401)
      .json({ error: { name: "Password", message: "password is incorrect" } });
  }
  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: 60,
  });

  // Send the token to the user
  res.status(200).json({ token });
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body || {};
  if (!password)
    return res
      .status(500)
      .json({ errors: { name: "Password", message: "password is required" } });

  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(200)
      .json({ errors: { name: "email", message: "User already exist" } });
  }

  //   const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(200).json({ message: "added user successfully" });
  } catch (error) {
    console.log(error.message);
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send({ errors });
    }
    res.status(500).send("Something went wrong");
  }
});

app.get("/protected", async (req, res) => {
  try {
    const token = req.header("authorization");
    const decode = jwt.verify(token?.split(" ")[1], SECRET_KEY);
    if (!decode) throw new Error("INVALID TOKEN");
    res.status(200).json({ status: "Authorized" });
  } catch (error) {
    const errors = {};
    Object.keys(error).forEach((key) => {
      errors[key] = error[key];
    });
    res.status(401).json({ errors });
  }
});
app.listen(PORT, () => console.log(`listening at ${PORT}`));

app.get("/messages", async (req, res) => {
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
