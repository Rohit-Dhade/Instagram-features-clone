const express = require("express");
const userRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware");
const {
  followUserController,
  unfollowUserController,
  requestStatusController,
} = require("../Controllers/user.controller");

userRouter.post("/follow/:username", identifyUser, followUserController);

userRouter.post("/Unfollow/:username", identifyUser, unfollowUserController);

userRouter.post(
  "/request/:username/:status",
  identifyUser,
  requestStatusController,
);

module.exports = userRouter;
