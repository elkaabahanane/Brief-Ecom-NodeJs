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

router.delete("/delete-product", async function (req, res) {
  const id_product = req.body.id_product;

  await connection
    .promise()
    .query("DELETE from product where id_product = ?", id_product);

  res.send("Done");
});

module.exports = router;
