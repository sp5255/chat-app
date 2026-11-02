import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { sharedToken } from "@/constants/sharedTokenMap.js";
import { getUser } from "../services/user.service.js";

const SECRET_KEY = "secret-key";

export const verifyToken: RequestHandler = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: { message: "Access denied" } });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    if (!sharedToken.has(decoded.id)) sharedToken.set(decoded.id, token);
    const { _id, ...userData }: any = await getUser({ email: decoded.email });
    (req as any).user = userData._doc;
    next();
  } catch (e: any) {
    let message = "Invalid credentials";
    if (e.name === "TokenExpiredError") message = "Token is expired";
    res.status(401).json({ error: { message } });
    return;
  }
};

export const verifyJwtToken = (token: string) => {

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (e: any) {
    let message = "Invalid credentials";
    if (e.name === "TokenExpiredError") message = "Token is expired";
    return message;
  }
};
