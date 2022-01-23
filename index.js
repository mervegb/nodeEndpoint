const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");

const PostRouter = require("./routes/post");
const CategoryRouter = require("./routes/category");
const UserRouter = require("./routes/user");
const AuthRouter = require("./routes/auth");

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/rest/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("File uploaded succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
app.use(express.json());
app.use("/rest/api/post", PostRouter);
app.use("/rest/api/auth", AuthRouter);
app.use("/rest/api/category", CategoryRouter);
app.use("/rest/api/user", UserRouter);

/* mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db connected"))
  .catch((error) => console.log(error)); */

app.listen(5000, () => console.log("Listening to port"));
