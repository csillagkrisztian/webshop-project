const express = require("express");
const router = express.Router();
const Order = require("../models").order;
const Product = require("../models").product;
const { validation } = require("../middleware/validation");
const Customer = require("../models").customer;

const orderRParam = "orderId";
const customerRParam = "customerId";
const productRParam = "productId";

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Customer,
        },
        {
          model: Product,
        },
      ],
    });
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:orderId",
  validation(Order, "orderId"),
  async (req, res, next) => {
    const order = await Order.findOne({
      where: { id: req.params.orderId },
      include: [
        {
          model: Customer,
        },
        {
          model: Product,
        },
      ],
    });
    res.json(order);
  }
);
//dont forget the customer too!

router.post("/", async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
});

router.patch(
  `/:${orderRParam}`,
  validation(Order, orderRParam, "order"),
  async (req, res, next) => {
    try {
      const order = req.order;
      const updatedOrder = order.update(req.body);
      res.send(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    if (orders && orders.length === 0) {
      res.send({ message: "No orders to delete" });
    } else {
      orders.forEach((o) => o.destroy());
      res.send({ message: `All orders were deleted!` });
    }
  } catch (error) {
    next(error);
  }
});

router.delete(
  `/:${orderRParam}`,
  validation(Order, orderRParam, "order"),
  async (req, res, next) => {
    try {
      const order = req.order;
      order.destroy();
      res.send({ message: `Order ID ${req.params.orderId} deleted` });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
