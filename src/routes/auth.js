const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middleWares/auth");

authRouter.post("/signUp", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, passWord, age, about, gender } =
      req.body;

    const hashPassword = await bcrypt.hash(passWord, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: hashPassword,
      age,
      about,
      gender,
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
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(passWord);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.json({ user });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("logOut Successfully");
});

module.exports = authRouter;
