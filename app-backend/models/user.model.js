const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  createAt: { type: Date, default: Date.now },
});

const User = model("User", userSchema);
module.exports = User;
