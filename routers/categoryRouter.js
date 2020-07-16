const express = require("express");
const router = express.Router();
const Category = require("../models").category;

router.get("/", async (req, res, next) => {
  res.json({ message: "Hoii there!" });
});

router.post("", async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
