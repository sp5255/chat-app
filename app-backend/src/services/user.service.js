const User = require("../models/user.model");

/**
 * add try-catch to every service -> to handle the db operations
 * OR find if there is any global solution
 *  */
exports.getUser = async ({ email, isLogIn = false }) => {
  if (isLogIn) return User.findOne({ email });
  return User.findOne({ email }).select("-password");
};

exports.getUserById = async ({ id }) => {
  return User.findById({ _id: id }).select("-password");
};

exports.addUser = async ({ name, email, password }) => {
  const newUser = new User({ name, email, password });
  await newUser.save();
};
