const express = require("express");
const { userAuth } = require("../middleWares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const userRouter = express.Router();
const mongoose = require("mongoose");
const User = require("../model/user");
const USER_SAFE_DATA = "firstName lastName age about photoUrl";

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

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * 10;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ formUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("formUserId toUserId status");

    const hideUserFromFeed = new Set();

    connectionRequests.forEach((req) => {
      hideUserFromFeed.add(req.formUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ users });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = userRouter;
