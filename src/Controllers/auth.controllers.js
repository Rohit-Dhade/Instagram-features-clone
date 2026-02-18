const UserModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')


async function authRegister(req, res) {
  const { email, username, password, bio, profileImage } = req.body;

  const isUserAlreadyExists = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "User already exists." +
        (isUserAlreadyExists.email == email
          ? "Email already exists"
          : "Username already exists"),
    });
  }

  const hash = await bcrypt.hash(password , 10)

  const user = await UserModel.create({
    email,
    username,
    bio,
    profileImage,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Account created Successfully",
    user_info: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function authlogin (req, res) {
  const { email, username, password } = req.body;

  const user = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(400).json({
      message: "User does not exists",
    });
  }

  const isPasswordvalid = await bcrypt.compare(password , user.password)
    
  if (!isPasswordvalid) {
    return res.status(400).json({
      message: "Password is invalid.",
    });
  }

  const token = jwt.sign(
    {
    id: user._id,
    },
    process.env.JWT_SECRET
    );

  res.cookie('token' , token);

    res.status(200).json({
        message:"User logged in Successfully."
    })
}

module.exports = {authRegister , authlogin}