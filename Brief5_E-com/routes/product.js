const express = require("express");
const router = express.Router();
const connection = require("../utils/connection");

router.post("/add-product", async function (req, res, next) {
  const data = req.body;
  const product = {
    product_name: data.name,
    price: Number(data.price),
    category: data.category,
  };

  await connection.promise().query("INSERT INTO product SET ?", product);

  res.redirect("/");
});

module.exports = router;
