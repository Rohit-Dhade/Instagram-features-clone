const express = require('express')
const userRouter = express.Router()
const identifyUser = require('../middlewares/auth.middleware');
const {followUserController , unfollowUserController} = require('../Controllers/user.controller')

userRouter.post('/follow/:username' ,identifyUser, followUserController);
userRouter.post('/Unfollow/:username' , identifyUser, unfollowUserController);

module.exports = userRouter