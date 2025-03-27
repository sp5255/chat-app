const express = require("express");
const cors = require("cors");

// const bcrypt = require("bcrypt");
const helloWorldRoute = require("./routes/hello-world.route");
const userAuthRoutes = require("./routes/auth.route");
const makeDBConnection = require("./services/connectDB.service");
const conversationRoute = require("./routes/conversation.route");
const { verifyToken } = require("./middleware/auth.middleware");
const PORT = 5500;
const app = express();

const logger = (req, _, next) => {
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

const server = app.listen(PORT, () => console.log(`listening at ${PORT}`));

// if (server) {
//   console.log("start : ", server);
// } else {
//   console.log("stop : ", server);
// }
