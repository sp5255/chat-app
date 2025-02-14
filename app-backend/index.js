const express = require("express");
// const bcrypt = require("bcrypt");
const helloWorldRoute = require("./routes/hello-world.route");
const userRegistrationRoutes = require("./routes/registration.route");

const User = require("./models/user.model");
const PORT = 3000;
const app = express();

const logger = (req, _, next) => {
  console.log(req.method, req.path);
  next();
};

app.use(express.json());
app.use(logger);
app.use("/hello", helloWorldRoute);
app.use("/user", userRegistrationRoutes);

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

app.listen(PORT, () => console.log(`listening at ${PORT}`));
