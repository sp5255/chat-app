const router = require("express").Router();

const {
  userSignIn,
  userSignUp,
  validateUserData,
  getUserByEmail,
  getCurrentUserProfile,
  getUser,
} = require("../controller/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/profile", verifyToken, getCurrentUserProfile);
router.post("/sign-in", validateUserData, userSignIn);
router.post("/sign-up", validateUserData, userSignUp);
// router.get("/:email", getUserByEmail);
router.get("/", verifyToken, getUser);

module.exports = router;
