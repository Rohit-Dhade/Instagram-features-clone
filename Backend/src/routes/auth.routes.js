const express = require("express");
const authRouter = express.Router();
const {authRegister , authlogin, getmeController} = require('../Controllers/auth.controllers')
const identifyUser = require('../middlewares/auth.middleware')

authRouter.post("/register", authRegister);
authRouter.post("/login", authlogin);
authRouter.get("/get-me" ,identifyUser,getmeController)

module.exports = authRouter;
