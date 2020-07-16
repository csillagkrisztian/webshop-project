const express = require("express");
const router = express.Router();
const Product = require("../models").product;

router.get("/", async (req, res, next) => {
  res.json({ message: "Hoii there!" });
});

router.post("", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
