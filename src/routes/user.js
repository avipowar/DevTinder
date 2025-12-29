const express = require("express");
const { userAuth } = require("../middleWares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const userRouter = express.Router();
const mongoose = require("mongoose");

const USER_SAFE_DATA = "firstName lastName age about";

userRouter.get("/user/request/receives", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // console.log(typeof loggedInUser._id);

    const connectionRequest = await ConnectionRequest.find({
      toUserId: new mongoose.Types.ObjectId(loggedInUser._id),
      status: "interested",
    }).populate("formUserId", USER_SAFE_DATA);

    res.json({
      message: "Got All The Request successfully",
      data: connectionRequest,
    });
  } catch (error) {
    res.status(404).send("ERROR: " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser, status: "accepted" },
        { formUserId: loggedInUser, status: "accepted" },
      ],
    })
      .populate("formUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.formUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.formUserId;
    });

    res.json({ data });
  } catch (error) {
    res.status(404).send("ERROR:" + error.message);
  }
});

module.exports = userRouter;
