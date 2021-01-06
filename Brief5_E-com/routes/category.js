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

module.exports = router;
