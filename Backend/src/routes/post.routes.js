const express = require("express");
const postRouter = express.Router();
const {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  getFeedController
} = require("../Controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  createPostController,
);

postRouter.get("/get-posts", identifyUser, getPostController);

postRouter.get("/details/:postId", identifyUser, getPostDetailsController);

postRouter.post('/like/:postId' , identifyUser, likePostController)

postRouter.get('/feed' , identifyUser , getFeedController);

module.exports = postRouter;
