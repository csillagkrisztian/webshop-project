const Customer = require("../models").customer;
const { toData } = require("../auth/jwt");

async function auth(req, res, next) {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const customer = await Customer.findByPk(data.userId);
      if (!customer) {
        res.status(404).send({ message: "Customer not found" });
      }
      req.customer = customer;
      next();
    } catch (e) {
      res.status(401).send({ message: "Invalid Token" });
    }
  } else {
    res.status(401).send({ message: "Please supply valid credentials" });
  }
}

module.exports = { auth };
