const { Schema, model } = require("mongoose");
const { SCHEMAS } = require("../utils/constants");

const roomSchema = new Schema(
  {
    codeName: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: String,
      require: true,
    },
    roomType: {
      type: String,
      required: true,
      enum: ['Premium', "Standard", "Economic"]
    }
  },
  { timestamps: true }
);

roomSchema.index({ "$**": "text" }, { default_language: "english"})

module.exports = model(SCHEMAS.ROOM_SCHEMA, roomSchema);
