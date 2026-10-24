import "module-alias/register";
import express, { type RequestHandler } from "express";
import cors from "cors";
import makeDBConnection from "@/services/connectDB.service";
import { verifyToken } from "@/middleware/auth.middleware";
import conversationRoute from "@/routes/conversation.route";
import messagesRoute from "@/routes/message.route";
import helloWorldRoute from "@/routes/hello-world.route";
import userAuthRoutes from "@/routes/auth.route";

// const bcrypt = require("bcrypt");

const PORT = 5500;
const app = express();

const logger: RequestHandler = (req, _, next) => {
  console.log(req.method, req.path);
  next();
};

makeDBConnection();
app.use(cors());
app.use(express.json());
app.use(logger);
// app.use(cors)

app.use("/hello", helloWorldRoute);
app.use("/user", userAuthRoutes);
app.use(verifyToken);
app.use("/conversation", conversationRoute);
app.use("/messages", messagesRoute);

const server = app.listen(PORT, () => console.log(`listening at ${PORT}`));

// if (server) {
//   console.log("start : ", server);
// } else {
//   console.log("stop : ", server);
// }
