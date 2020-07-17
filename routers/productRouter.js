const express = require("express");
const router = express.Router();
const Product = require("../models").product;
const { validation } = require("../middleware/validation");
const Customer = require("../models").customer;

router.get("/", async (req, res, next) => {
  const products = await Product.findAll();

  res.json(products);
});

router.patch(
  "/:productId/:customerId",
  validation(Product, "productId", "product"),
  validation(Customer, "customerId", "customer"),
  async (req, res, next) => {
    const product = await req.product;
    const customer = await req.customer;
    console.log(product);
    console.log(customer);
    //const updatedProduct = await product.update(req.body);
    res.json({ product: product.name, customer: customer.name });
  }
);

router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
