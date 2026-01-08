const express = require("express");
const profileRouter = express.Router();
const User = require("../model/user");
const crypto = require("crypto");

const { resetUserPassword } = require("../utils/validation");
const { forgotPasswordService } = require("../utils/validation");

const { userAuth } = require("../middleWares/auth");
const { validateProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.json(user);
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (validateProfileData(req)) {
      return res.status(401).json({ message: "Invalid User" });
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    // res.send(`${loggedInUser.firstName} your profile is updated successfully`);
    res.json({
      message: `${loggedInUser.firstName} your profile is updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(404).send("Error Message: " + error);
  }
});

profileRouter.post("/profile/forgot-password", async (req, res) => {
  try {
    const { emailId } = req.body;

    const resetToken = await forgotPasswordService(emailId);

    res.json({
      message: "Reset Link Sent To EMail",
      resetToken,
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

profileRouter.post("/profile/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    await resetUserPassword(token, newPassword);

    res.send("Password reset successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = profileRouter;
