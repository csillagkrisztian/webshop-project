const express = require("express");
const router = express.Router();
const Customer = require("../models").customer;

router.get("/", async (req, res, next) => {
  res.json({ message: "Hoii there!" });
});

router.post("", async (req, res, next) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.json(newCustomer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
