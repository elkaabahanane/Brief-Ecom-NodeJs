const express = require("express");
const router = express.Router();
const connection = require("../utils/connection");

router.post("/add-category", async function (req, res, next) {
  const data = req.body;
  const category = {
    name_category: data.name,
  };

  await connection.promise().query("INSERT INTO category SET ?", category);

  res.redirect("/");
});

router.delete("/delete-category", async function (req, res) {
  const id_category = req.body.id_category;

  await connection
    .promise()
    .query("DELETE from category where id_category = ?", id_category);

  res.send("Done");
});

router.get("/category-update/:id", async function (req, res) {
  const id_category = req.params.id;
  const [categories] = await connection
    .promise()
    .query("SELECT * from category where id_category = ?", id_category);

  res.render("category-update", { category: categories[0] });
});

router.post("/category-update", async function (req, res) {
  const data = req.body;
  const category = {
    id_category: Number(data.id),
    name_category: data.name,
  };

  await connection
    .promise()
    .query("UPDATE category SET name_category = ? WHERE id_category = ?", [
      category.name_category,
      category.id_category,
    ]);

  res.redirect("/");
});

module.exports = router;
