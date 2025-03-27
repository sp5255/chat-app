const jwt = require("jsonwebtoken");

const {
  getUser,
  addUser,
  getUserById: getUserByIdService,
} = require("../services/user.service");
const { handleSuccessResponse, handleFieldError } = require("../utils/handleResponse");
const SECRET_KEY = "secret-key";

const userSignIn = async (req, res) => {
  const { email, password } = req.body || {};

  const user = await getUser({ email });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  //   const found = await bcrypt.compare(password ?? "", user.password ?? "");

  if (password != user.password) {
    return res
      .status(401)
      .json({ error: { name: "Password", message: "password is incorrect" } });
  }
  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: "2h",
  });

  // Send the token to the user
  res.status(200).json({ token });
};

const validateUserData = async (req, res, next) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    handleFieldError(
      {
        field: !email ? "email" : "password",
        message: "Field is required",
      },
      res
    );
    return;
  }
  next();
};

const userSignUp = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await getUser({ email });
  if (user) {
    return res
      .status(200)
      .json({ errors: { name: "email", message: "User already exist" } });
  }

  //   const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await addUser({ username, email, password });
    handleSuccessResponse({ message: "User sign up successful" }, res);
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

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  const user = await getUser({ email });
  res.json(user).status(200);
};
const getUserById = async (req, res) => {
  console.log("req params : ", req.params);
  const { id } = req.params || {};
  const user = await getUserByIdService({ id });
  res.json(user).status(200);
};

exports.userSignIn = userSignIn;
exports.userSignUp = userSignUp;
exports.validateUserData = validateUserData;
exports.getUserByEmail = getUserByEmail;
exports.getUserById = getUserById;
