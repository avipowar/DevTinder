const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    formUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ConnectionRequestSchemaModel = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestSchemaModel;
