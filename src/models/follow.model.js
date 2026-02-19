const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usermodels",
    required: [true, "Follower is required"],
  },
  followee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usermodels",
    required: [true, "Followee is required"],
  },
  timestamps: true,
});

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;
