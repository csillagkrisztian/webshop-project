const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const Customer = require("../models").customer;
const bcrypt = require("bcrypt");
const { auth } = require("../middleware/auth");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({
      message: "Please supply a valid email and password",
    });
  } else {
    const user = await Customer.findOne({
      where: {
        email,
      },
    });
    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if (!user || !isCorrectPassword) {
      res.status(400).send({
        message: "Please supply a valid email and password",
      });
    }
    console.log(user.id);
    console.log(user);
    res.send({
      jwt: toJWT({ userId: user.id }),
    });
  }
});

router.get("/me", auth, async (req, res, next) => {
  const customer = req.customer;
  res.send(customer);
});
module.exports = router;
