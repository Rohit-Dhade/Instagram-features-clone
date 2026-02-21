const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");
const requestModel = require("../models/request.model");
const UserModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isFolloweeExits = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExits) {
    return res.status(400).json({
      message: `${followeeUsername} does not exists.`,
    });
  }

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself.",
    });
  }

  const isAlreadyFollow = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollow) {
    return res.status(400).json({
      message: `You already follow the ${followeeUsername}`,
    });
  }

  const followUser = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  const request = await requestModel.create({
    username: followerUsername,
    status: "pending",
  });

  res.status(201).json({
    message: `You are following ${followeeUsername}`,
    followUser,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserfollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserfollowing) {
    return res.status(400).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserfollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
  });
}

async function requestStatusController(req, res) {
  const followerUsername = req.params.username;
  const result = req.params.status;

  if (result !== 'pending' && 
    result !== 'accepted' && 
    result !== 'rejected') {
    
    return res.status(400).json({
        message: "Invalid request. Should be pending, accepted or rejected"
    });
}

  const isUserExists = await requestModel.findOne({
    username: followerUsername,
  });

  if (!isUserExists) {
    return res.status(400).json({
      message: `${followerUsername} does not exists in your requests`,
    });
  }

  await followModel.findOneAndUpdate({follower:followerUsername} , { status: result });

  await requestModel.findByIdAndUpdate(isUserExists._id , { status: result });

  res.status(200).json({
    message: `your request has been ${result}`,
  });
}

module.exports = { followUserController, unfollowUserController , requestStatusController };
