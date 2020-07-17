const express = require("express");
const router = express.Router();
const Category = require("../models").category;
const Product = require("../models").product;
const { validation } = require("../middleware/validation");

const categoryRParam = "categoryId";

router.get("/", async (req, res, next) => {
  try {
    const category = await Category.findAll();
    res.send(category);
  } catch (error) {
    next(error);
  }
});

router.get(
  `/:${categoryRParam}`,
  validation(Category, categoryRParam, "category"),
  async (req, res, next) => {
    try {
      // const category = await req.category;
      const category = await Category.findOne({
        where: {
          id: req.params.categoryId,
        },
        include: [Product],
      });
      res.send(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
