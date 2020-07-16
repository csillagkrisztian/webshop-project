const express = require("express");
const router = express.Router();
const Product = require("../models").product;

router.get("/", async (req, res, next) => {
  res.json({ message: "Hoii there!" });
});

module.exports = router;
