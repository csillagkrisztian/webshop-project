const express = require("express");
const router = express.Router();
const Customer = require("../models").customer;
const { validation } = require("../middleware/validation");
const { auth } = require("../middleware/auth");
const Product = require("../models").product;
const bcrypt = require("bcrypt");

// the route parameter of the customer
const customerRParam = "customerId";

router.get("/", async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    if (!customers.length) {
      res.send({ message: "No customers found" });
    }
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
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("missing parameters");
    } else {
      const newCustomer = await Customer.create({
        ...req.body,
        // Here, when handing down the password to the create method we hash it.
        password: bcrypt.hashSync(password, 10),
      });

      res.json(newCustomer);
    }
  } catch (error) {
    next(error);
  }
});

router.patch(
  `/:${customerRParam}`,
  validation(Customer, auth, customerRParam, "customer"),
  async (req, res, next) => {
    try {
      const customer = req.customer;
      const updatedCustomer = await customer.update(req.body);
      res.send(updatedCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/", auth, async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    if (customers && customers.length === 0) {
      res.send({ message: "no users to delete" });
    } else {
      const deleteCustomers = customers.map(async (c) => await c.destroy());
      await Promise.all(deleteCustomers);
      res.send({ message: "all users deleted" });
    }
  } catch (error) {
    next(e);
  }
});

router.delete(
  `/:${customerRParam}`,
  validation(Customer, auth, customerRParam, "customer"),
  async (req, res, next) => {
    try {
      const customer = req.customer;
      await customer.destroy();
      res.send({ message: `Customer ID ${req.customer.id} deleted` });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
