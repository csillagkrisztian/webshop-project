const express = require("express");
const app = express();
const customerRouter = require("./routers/customerRouter");
const productRouter = require("./routers/productRouter");
const categoryRouter = require("./routers/categoryRouter");
const orderRouter = require("./routers/orderRouter");
const authRouter = require("./routers/authRouter");

app.set("port", process.env.port || 3000);

app.use(express.json());
app.use("/auth", authRouter);
app.use("/customers", customerRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);

app.listen(app.get("port"), (server) => {
  console.info(`Server listen on port ${app.get("port")}`);
});
