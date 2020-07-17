const express = require("express");
const router = express.Router();
const Product = require("../models").product;
const { validation } = require("../middleware/validation");
const Category = require("../models").category;

const productRParam = "productId";

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get(
  `/:${productRParam}`,
  validation(Product, productRParam, "product"),
  async (req, res, next) => {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.productId,
        },
        include: [Category],
      });
      res.send(product);
    } catch (error) {}
  }
);

router.post("/", async (req, res, next) => {
  try {
    const { name, price, imageUrl, categoryId, description } = req.body;
    if ((!name, !price, !imageUrl, !categoryId, !description)) {
      res.send({ message: "You are missing parameters" });
    }
    const newProduct = await Product.create(req.body);

    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.patch(
  `/:${productRParam}`,
  validation(Product, productRParam, "product"),
  async (req, res, next) => {
    try {
      const product = req.product;
      const updatedProduct = product.update(req.body);
      res.send(updatedProduct);
    } catch (error) {}
  }
);

router.delete("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    if (products && products.length === 0) {
      res.send({ message: "no products to delete" });
    } else {
      products.forEach((p) => p.destroy());
      res.send({ message: "all products deleted" });
    }
  } catch (error) {
    next(e);
  }
});

router.delete(
  `/:${productRParam}`,
  validation(Product, productRParam, "product"),
  async (req, res, next) => {
    try {
      const product = req.product;
      product.destroy();
      res.send({ message: `Product ID ${req.params.productId} deleted` });
    } catch (error) {}
  }
);

module.exports = router;
