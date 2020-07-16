const express = require("express");
const router = express.Router();
const Category = require("../models").category;

router.get("/", async (req, res, next) => {
  res.json({ message: "Hoii there!" });
});

module.exports = router;
