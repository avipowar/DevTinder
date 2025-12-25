const express = require("express");
const { userAuth } = require("../middleWares/auth");
const ConnectionRequest = require("../model/connectionrequest");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user._id;
      const formUserId = user;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(404)
          .json({ message: "Invalid Status type: " + status });
      }

      const connectionRequest = new ConnectionRequest({
        formUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: user.firstName + " sent the connection request successfully!",
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);

module.exports = requestRouter;
