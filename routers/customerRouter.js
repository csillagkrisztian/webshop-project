const express = require("express");
const router = express.Router();
const Customer = require("../models").customer;

router.get("/", async (req, res, next) => {
  res.json({ message: "Hoii there!" });
});

module.exports = router;
