const express = require("express");
const router = express.Router();
const Category = require("../models").category;
const Product = require("../models").product;
const { validation } = require("../middleware/validation");

const categoryRParam = "categoryId";

router.get("/", async (req, res, next) => {
  try {
    const category = await Category.findAll({ include: [Product] });
    if (!category.length) {
      res.send({ message: "No categories were found" });
    }
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

router.patch(
  `/:${categoryRParam}`,
  validation(Category, categoryRParam, "category"),
  async (req, res, next) => {
    try {
      const category = req.category;
      const updatedCategory = await category.update(req.body);
      res.send(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  `/:${categoryRParam}`,
  validation(Category, categoryRParam, "category"),
  async (req, res, next) => {
    try {
      const category = req.category;
      await category.destroy();
      res.send({ message: `Category ID ${req.params.categoryId} deleted` });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    if (categories && categories.length === 0) {
      res.send({ message: "no categories to delete" });
    } else {
      const deleteCategories = categories.map(async (c) => await c.destroy());
      await Promise.all(deleteCategories);
      res.send({ message: "all categories deleted" });
    }
  } catch (error) {
    next(e);
  }
});

module.exports = router;
