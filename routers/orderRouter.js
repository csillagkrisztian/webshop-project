const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "Hey baby" });
});

module.exports = router;
