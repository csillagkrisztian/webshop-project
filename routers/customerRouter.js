const express = require("express");
const router = express.Router();
const Customer = require("../models").customer;
const { validation } = require("../middleware/validation");
const Order = require("../models").order;
const Product = require("../models").product;

// the route parameter of the customer
const customerRParam = "customerId";

router.get("/", async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    res.send(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  `/:${customerRParam}`,
  validation(Customer, customerRParam, "customer"),
  async (req, res, next) => {
    try {
      const customer = req.customer;
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  `/:${customerRParam}/orders`,
  validation(Customer, customerRParam, "customer"),
  async (req, res, next) => {
    try {
      const customer = await Customer.findOne({
        where: { id: req.params.customerId },
        include: [Product],
      });
      res.send(customer);
    } catch (error) {}
  }
);

router.post("/", async (req, res, next) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.json(newCustomer);
  } catch (error) {
    next(error);
  }
});

router.patch(
  `/:${customerRParam}`,
  validation(Customer, customerRParam, "customer"),
  async (req, res, next) => {
    try {
      const customer = req.customer;
      const updatedCustomer = customer.update(req.body);
      res.send(updatedCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/", async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    if (customers && customers.length === 0) {
      res.send({ message: "no users to delete" });
    } else {
      customers.forEach((c) => c.destroy());
      res.send({ message: "all users deleted" });
    }
  } catch (error) {
    next(e);
  }
});

router.delete(
  `/:${customerRParam}`,
  validation(Customer, customerRParam, "customer"),
  async (req, res, next) => {
    try {
      const customer = req.customer;
      customer.destroy();
      res.send({ message: `Customer ID ${req.customer.id} deleted` });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;