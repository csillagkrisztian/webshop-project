const express = require("express");
const app = express();
const path = require("path");
const customerRouter = require("./routers/customerRouter");
const productRouter = require("./routers/productRouter");
const categoryRouter = require("./routers/categoryRouter");
const orderRouter = require("./routers/orderRouter");

app.set("port", process.env.port || 3000);

app.use("/customers", customerRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);

app.listen(app.get("port"), (server) => {
  console.info(`Server listen on port ${app.get("port")}`);
});
