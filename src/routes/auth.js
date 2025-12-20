const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../model/user");
const bcrypt = require("bcrypt");

authRouter.post("/signUp", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, passWord } = req.body;

    const hashPassword = await bcrypt.hash(passWord, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: hashPassword,
    });

    await user.save();
    res.send("User Added into Database Successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, passWord } = req.body;

  try {
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Email Id Is Wrong");
    }

    const isPasswordValid = await user.validatePassword(passWord);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("User Login Successfully");
    } else {
      throw new Error("Password is Incorrect");
    }
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

module.exports = authRouter;
