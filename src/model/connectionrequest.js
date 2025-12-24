const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  formUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: string,
    enum: {
      values: ["ignore", "interested", "ignore", "rejected"],
      message: `{VALUE} is incorrect status type`,
    },
  },
});

const ConnectionRequestSchemaModel = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestSchemaModel;
