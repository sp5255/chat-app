const { Schema, model } = require("mongoose");
const userSchema = new Schema({
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
});

const User = model("User", userSchema);
module.exports = User;
