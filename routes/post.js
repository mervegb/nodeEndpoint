const { verifyToken } = require("../middleware/verifyToken");
const Post = require("../model/Post");

const router = require("express").Router();

//create post
router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const newPost = new Post({ ...req.body, userId });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update post
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json("Post Not Found");

    if (req.user.id === post.userId) {
      await post.updateOne({
        $set: req.body,
      });
    } else {
      res.status(403).json("You can only update your posts");
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
//delete post
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json("Post Not Found");

    if (req.user.id === post.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } else {
      res.status(403).json("You are not allowed to do this");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get post
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json("Post Not Found");

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all posts
router.get("/all", verifyToken, async (req, res) => {
  const username = req.query.username;
  const category = req.query.category;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (category) {
      posts = await Post.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
