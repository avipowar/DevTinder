const express = require("express");
const profileRouter = express.Router();

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

module.exports = profileRouter;
