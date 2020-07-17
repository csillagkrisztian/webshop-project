const express = require("express");
const router = express.Router();
const Customer = require("../models").customer;
const { validation } = require("../middleware/validation");

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
      const customer = await req.customer;
      res.json(customer);
    } catch (error) {
      next(error);
    }
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
      const customer = await req.customer;
      const updatedCustomer = await customer.update(req.body);
      res.send(updatedCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/", async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    customers.destroy();
    res.send({ message: "all users deleted" });
  } catch (error) {
    next(e);
  }
});

router.delete(
  `/:${customerRParam}`,
  validation(Customer, customerRParam, "customer"),
  async (req, res, next) => {
    try {
      const customer = await req.customer;
      await customer.destroy();
      res.send({ message: `Customer ID ${req.customer.id} deleted` });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
