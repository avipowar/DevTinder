const express = require("express");
const { userAuth } = require("../middleWares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const userRouter = express.Router();
const mongoose = require("mongoose");

userRouter.get("/user/request/receives", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    console.log(typeof loggedInUser._id);

    const connectionRequest = await ConnectionRequest.find({
      toUserId: new mongoose.Types.ObjectId(loggedInUser._id),
      status: "interested",
    }).populate("formUserId", "firstName lastName age about");

    res.json({
      message: "Got All The Request successfully",
      data: connectionRequest,
    });
  } catch (error) {
    res.status(404).send("ERROR: " + error.message);
  }
});

module.exports = userRouter;
