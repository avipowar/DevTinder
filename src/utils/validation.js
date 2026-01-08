const validator = require("validator");
const User = require("../model/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const validateSignUpData = (req) => {
  // Destructuring
  const { firstName, lastName, emailId, passWord } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name Is Not Valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email Is Not Valid");
  } else if (!validator.isStrongPassword(passWord)) {
    throw new Error("Password Is Not Strong");
  }
};

const validateProfileData = (req) => {
  const allowToEdit = [
    "fistName",
    "lastName",
    "photoUrl",
    "about",
    "skills",
    "age",
    "gender",
  ];

  const isAllowed = Object.keys(req.body).every((key) =>
    allowToEdit.includes(key)
  );

  return isAllowed;
};

const forgotPasswordService = async (emailId) => {
  const user = await User.findOne({ emailId });

  if (!user) {
    throw new Error("User Not Found");
  }

  const resetToken = await crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetToken = hashedToken;
  user.resetTokenExpiryDate = Date.now() + 10 * 60 * 1000;

  await user.save();

  return resetToken;
};

const resetUserPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiryDate: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Token Invalid or expired");
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  user.passWord = hashPassword;
  user.resetToken = undefined;
  user.resetTokenExpiryDate = undefined;

  await user.save();

  return true;
};

module.exports = {
  validateSignUpData,
  validateProfileData,
  forgotPasswordService,
  resetUserPassword,
};
