import cors from "cors";
import express, { type RequestHandler } from "express";
import "module-alias/register";
import { createServer } from "node:http";
import { Server, type DefaultEventsMap } from "socket.io";

import { socketConnectionHandler } from "@/controller/socketConnectionHandler.controller";
import { verifyToken } from "@/middleware/auth.middleware";
import { verifySocketToken } from "@/middleware/socketMiddleware";
import userAuthRoutes from "@/routes/auth.route";
import conversationRoute from "@/routes/conversation.route";
import helloWorldRoute from "@/routes/hello-world.route";
import messagesRoute from "@/routes/message.route";
import makeDBConnection from "@/services/connectDB.service";

// const bcrypt = require("bcrypt");

const PORT = 5500;
const app = express();

interface User {
  id: string;
  email: string;
}

const appHttpServer = createServer(app);

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

const io = new Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  { user: User }
>(appHttpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },

  /* options */
});

io.use(verifySocketToken);

io.on("connection", (socket) => socketConnectionHandler(socket, io));

app.use("/conversation", conversationRoute);
app.use("/messages", messagesRoute);

appHttpServer.listen(PORT, () => console.log(`listening at ${PORT}`));

// if (server) {
//   console.log("start : ", server);
// } else {
//   console.log("stop : ", server);
// }
