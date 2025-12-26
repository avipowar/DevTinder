const express = require("express");
const { userAuth } = require("../middleWares/auth");
const ConnectionRequest = require("../model/connectionrequest");
const requestRouter = express.Router();
const User = require("../model/user");
const { Connection } = require("mongoose");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const formUserId = user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      // check validations for status:
      if (!allowedStatus.includes(status)) {
        return res
          .status(404)
          .json({ message: "Invalid Status type: " + status });
      }

      // check validations for duplicate user and / same user we send req they do not send req to you
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { formUserId, toUserId },
          {
            formUserId: toUserId,
            toUserId: formUserId,
          },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection Req Is Already Exist !!" });
      }

      // check toUserId is exist or not in my Database
      const toUser = await User.findById(toUserId);
      // console.log(toUser);
      if (!toUser) {
        return res.status(404).json({ message: "User Is NOT Found " });
      }

      // created mongoose object

      const connectionRequest = new ConnectionRequest({
        formUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message:
          user.firstName +
          " sent the connection request to " +
          toUser.firstName +
          " successfully!",
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);

module.exports = requestRouter;
