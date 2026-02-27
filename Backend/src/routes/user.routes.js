const express = require("express");
const userRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware");
const {
  followUserController,
  unfollowUserController,
  requestStatusController,
  followingController,
  followerController,
  getAllUserController
} = require("../Controllers/user.controller");

userRouter.get('/allUsers' , identifyUser,getAllUserController);

userRouter.post("/follow/:username", identifyUser, followUserController);

userRouter.post("/Unfollow/:username", identifyUser, unfollowUserController);

userRouter.get('/following' , identifyUser,followingController)

userRouter.get('/follower' , identifyUser, followerController)

userRouter.post(
  "/request/:username/:status",
  identifyUser,
  requestStatusController,
);

module.exports = userRouter;
