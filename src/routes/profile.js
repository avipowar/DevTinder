const express = require("express");
const profileRouter = express.Router();
const User = require("../model/user");
const crypto = require("crypto");

const { userAuth } = require("../middleWares/auth");
const { validateProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Invalid User");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).every((key) => (loggedInUser[key] = req.body[key]));

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

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    // generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    // console.log("resetToken: " + resetToken);
    const hashRestToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    // console.log("hashRestToken: " + hashRestToken);

    // add expiry time
    const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.resetToken = hashRestToken;
    user.resetTokenExpiryDate = resetTokenExpiry;

    const dataToken = await user.save();

    res.json({ message: "Reset Link Sent To EMail", resetToken });
  } catch (error) {
    res.send(err.message);
  }
});

profileRouter.post("/profile/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiryDate: { $gt: Date.now() },
    });

    if (!user) {
      return res.send("Token Invalid or expired");
    }

    user.passWord = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiryDate = undefined;

    const data = await user.save();
    console.log(data);
    res.send("Password reset successfully");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = profileRouter;
