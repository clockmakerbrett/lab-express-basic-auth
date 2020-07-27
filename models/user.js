// User model goes here
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 15,
  },
  hashedPw: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
