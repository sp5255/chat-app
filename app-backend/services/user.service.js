const User = require("../models/user.model");

/**
 * add try-catch to every service -> to handle the db operations
 * OR find if there is any global solution
 *  */
exports.getUser = async ({ email }) => {
  return User.findOne({ email });
};

exports.getUserById = async ({ id }) => {
  return User.findById({ _id: id });
};

exports.addUser = async ({ username, email, password }) => {
  const newUser = new User({ username, email, password });
  await newUser.save();
};