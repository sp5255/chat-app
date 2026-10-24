import {
  getCurrentUserProfile,
  getUser,
  userSignIn,
  userSignUp,
  validateUserData,
} from "@/controller/auth.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";

const router = require("express").Router();

router.get("/profile", verifyToken, getCurrentUserProfile);
router.post("/sign-in", validateUserData, userSignIn);
router.post("/sign-up", validateUserData, userSignUp);
// router.get("/:email", getUserByEmail);
router.get("/", verifyToken, getUser);

export default router;
