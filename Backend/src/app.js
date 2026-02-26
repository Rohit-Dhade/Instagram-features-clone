const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.set("etag", false);
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user/", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Home page",
  });
});

module.exports = app;
