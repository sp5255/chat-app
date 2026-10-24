import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

import {
  getUser as getUserByEmailService,
  addUser,
  getUserById as getUserByIdService,
} from "../services/user.service.js";
import {
  handleSuccessResponse,
  handleFieldError,
} from "../utils/handleResponse.js";
const SECRET_KEY = "secret-key";

const createJwtToken = (user: any) => {
  return jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: 40,
  });
};

const userSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  const user = await getUserByEmailService({ email, isLogIn: true });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  //   const found = await bcrypt.compare(password ?? "", user.password ?? "");

  if (password !== user.password) {
    return res
      .status(401)
      .json({ error: { name: "Password", message: "password is incorrect" } });
  }
  const token = createJwtToken(user);

  // Send the token to the user
  res.status(200).json({ token, email });
};

const validateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    handleFieldError(
      {
        field: !email ? "email" : "password",
        message: "Field is required",
      },
      res,
    );
    return;
  }
  next();
};

const userSignUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await getUserByEmailService({ email });
  if (user) {
    return res
      .status(400)
      .json({ errors: { name: "email", message: "User already exist" } });
  }

  //   const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const token = createJwtToken({ email });
    const user = await addUser({ name, email, password });
    res
      .status(201)
      .json({ token, user: email, message: "User sign up successful" });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors: any = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send(errors);
    }
    res.status(500).send("Something went wrong");
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = await getUserByEmailService({ email });
  res.json(user).status(200);
};

const getUser = async (req: Request, res: Response) => {
  const { id, email } = req.query || {};

  if (id) {
    const user = await getUserByIdService({ id });
    res.json(user).status(200);
    return;
  }
  if (email) {
    const user = await getUserByEmailService({ email });
    res.status(200).json(user);
    return;
  }

  res.status(400).json({ message: "Invalid query" });
};

//TODO: error handler/ handle failure cases
const getCurrentUserProfile = async (req: any, res: Response) => {
  // console.log("user id:", req.user);

  // TODO: // 1. Define your User structure, 2. Extend the standard Request , example => interface AuthenticatedRequest extends Request
  const { _id: id } = req.user;
  const user = await getUserByIdService({ id });
  res.status(200).json(user);
};

export {
  userSignIn,
  userSignUp,
  validateUserData,
  getUserByEmail,
  getUser,
  getCurrentUserProfile,
};
