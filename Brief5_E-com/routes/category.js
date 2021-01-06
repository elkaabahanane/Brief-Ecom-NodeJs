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

module.exports = router;
