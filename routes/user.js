const router = require("express").Router();
const { authorizeUser, verifyToken } = require("../middleware/verifyToken");
const User = require("../model/User");
const CryptoJS = require("crypto-js");

//update user
router.put("/:id", authorizeUser, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString();
  }

  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json("User updated");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    !user && res.status(404).json("User Not Found");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete user
router.delete("/:id", authorizeUser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
