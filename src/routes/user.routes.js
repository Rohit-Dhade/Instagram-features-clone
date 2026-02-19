const express = require('express')
const userRouter = express.Router()
const identifyUser = require('../middlewares/auth.middleware');
const {followUserController} = require('../Controllers/user.controller')

userRouter.post('/follow/:username' ,identifyUser, followUserController)

module.exports = userRouter