const express = require("express");
const authRouter = express.Router();
const {authRegister , authlogin} = require('../Controllers/auth.controllers')

authRouter.post("/register", authRegister);

authRouter.post("/login", authlogin);

module.exports = authRouter;
