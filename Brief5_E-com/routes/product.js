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

router.get("/product-update/:id", async function (req, res) {
  const id_product = req.params.id;
  const [categories] = await connection
    .promise()
    .query("SELECT * FROM category");
  const [products] = await connection
    .promise()
    .query("SELECT * from product where id_product = ?", id_product);

  res.render("product-update", { product: products[0], categories });
});

router.post("/product-update", async function (req, res) {
  const data = req.body;
  const product = {
    id_product: Number(data.id),
    product_name: data.name,
    price: Number(data.price),
    category: Number(data.category),
  };

  await connection
    .promise()
    .query(
      "UPDATE product SET product_name = ?, price = ?, category = ? WHERE id_product = ?",
      [
        product.product_name,
        product.price,
        product.category,
        product.id_product,
      ]
    );

  res.redirect("/");
});

module.exports = router;
