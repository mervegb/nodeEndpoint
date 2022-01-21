const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");
const Category = require("../model/Category");

//create category
router.post("/", verifyToken, async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all categories
router.get("/all", verifyToken, async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
