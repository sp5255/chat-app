const router = require("express").Router();

const {
  userSignIn,
  userSignUp,
  validateUserData,
} = require("../controller/registration.controller");

console.log("user ", userSignIn, userSignUp);
router.post("/sign-in", validateUserData, userSignIn);
router.post("/sign-up", validateUserData, userSignUp);

module.exports = router;
