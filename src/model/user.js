const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  passWord: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
