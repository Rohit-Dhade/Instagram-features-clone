const postModel = require("../models/post.model");
const LikeModel = require("../models/like.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const profiles = [
  {
    username: "rohit01",
    email: "rohit01@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Future ML Engineer 🚀",
    password: "rohit123"
  },
  {
    username: "sameksha02",
    email: "sameksha02@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    bio: "Coffee + Code ☕💻",
    password: "sameksha123"
  },
  {
    username: "devraj03",
    email: "devraj03@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    bio: "Backend Developer",
    password: "devraj123"
  },
  {
    username: "ananya04",
    email: "ananya04@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
    bio: "UI/UX Designer 🎨",
    password: "ananya123"
  },
  {
    username: "techguru05",
    email: "techguru05@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
    bio: "JavaScript Enthusiast",
    password: "techguru123"
  },
  {
    username: "fitness06",
    email: "fitness06@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
    bio: "Gym | Discipline | Growth",
    password: "fitness123"
  },
  {
    username: "coder07",
    email: "coder07@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
    bio: "MERN Stack Developer",
    password: "coder123"
  },
  {
    username: "travel08",
    email: "travel08@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/8.jpg",
    bio: "Exploring the world 🌍",
    password: "travel123"
  },
  {
    username: "photoman09",
    email: "photoman09@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/9.jpg",
    bio: "Photography Lover 📸",
    password: "photo123"
  },
  {
    username: "reader10",
    email: "reader10@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/10.jpg",
    bio: "Books are life 📚",
    password: "reader123"
  },
  {
    username: "gamer11",
    email: "gamer11@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/11.jpg",
    bio: "Gaming is passion 🎮",
    password: "gamer123"
  },
  {
    username: "artist12",
    email: "artist12@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/12.jpg",
    bio: "Sketching my dreams ✏️",
    password: "artist123"
  },
  {
    username: "startup13",
    email: "startup13@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/13.jpg",
    bio: "Building something big 💡",
    password: "startup123"
  },
  {
    username: "nature14",
    email: "nature14@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/14.jpg",
    bio: "Nature heals 🌿",
    password: "nature123"
  },
  {
    username: "music15",
    email: "music15@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/15.jpg",
    bio: "Music is therapy 🎵",
    password: "music123"
  }
];

const client = new ImageKit({
  privateKey: process.env.IMAGE_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post Created Successfully.",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  if (posts.length === 0) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.status(200).json({
    message: "Post Fetched successfully.",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content.",
    });
  }

  res.status(200).json({
    message: "Post Fetch successfully.",
    post,
  });
}

async function likePostController(req, res) {
  const postId = req.params.postId;
  const username = req.user.username;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(400).json({
      message: "Post Does not exists.",
    });
  }

  const like = await LikeModel.create({
    post: postId,
    user: username,
  });

  res.status(201).json({
    message: "Post liked Succesfully",
    like,
  });
}

async function UnlikePostController(req, res) {
  const postId = req.params.postId;
  const username = req.user.username;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(400).json({
      message: "Post Does not exists.",
    });
  }

  const islike = await LikeModel.findOne({
    post: postId,
    user: username,
  });

  if(!islike){
    return res.status(400).json({
      message : "You have not liked this post"
    })
  }

  await LikeModel.findOneAndDelete({_id : islike._id});


  res.status(200).json({
    message: "Post Unliked Succesfully"
  });
}

async function getFeedController(req, res) {
  const user = req.user

    const posts = await Promise.all((await postModel.find({}).populate("user").lean())
        .map(async (post) => {
            const isLiked = await LikeModel.findOne({
                user: user.username,
                post: post._id
            })

            post.isLiked = Boolean(isLiked)

            return post
        }))



    res.status(200).json({
        message: "posts fetched successfully.",
        posts
    })
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  UnlikePostController,
  getFeedController,
};
