import express, { type Request } from "express";
import cors from "cors";

// const bcrypt = require("bcrypt");
import helloWorldRoute from "./routes/hello-world.route.js";
import userAuthRoutes from "./routes/auth.route.js";
import makeDBConnection from "./services/connectDB.service.js";
import conversationRoute from "./routes/conversation.route.js";
import { verifyToken } from "./middleware/auth.middleware.js";
import messagesRoute from "./routes/message.route.js";
const PORT = 5500;
const app = express();

const logger = (req: Request, _, next) => {
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
