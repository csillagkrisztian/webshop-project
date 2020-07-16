const express = require("express");
const router = express.Router();
const Order = require("../models").order;
const Product = require("../models").product;

router.get("/:orderId", async (req, res, next) => {
  const order = await Order.findOne({
    where: { id: req.params.orderId },
    include: {
      model: Product,
      attributes: ["name"],
    },
  });
  const product = order.product.name;
  res.json(product);
});

router.post("", async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
