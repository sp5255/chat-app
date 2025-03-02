const router = require("express").Router();

const {
  userSignIn,
  userSignUp,
  validateUserData,
  getUserByEmail,
  getUserById,
} = require("../controller/auth.controller");

// router.get("/:email", getUserByEmail);
router.get("/:id", getUserById);
router.post("/sign-in", validateUserData, userSignIn);
router.post("/sign-up", validateUserData, userSignUp);

module.exports = router;
