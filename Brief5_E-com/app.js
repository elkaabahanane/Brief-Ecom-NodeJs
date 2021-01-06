const connection = require("./utils/connection");
const express = require("express");
const app = express();

//Set view engine
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", async function (req, res, next) {
  const [categories] = await connection
    .promise()
    .query("SELECT * FROM category");
  const [products] = await connection
    .promise()
    .query(
      "SELECT * FROM product, category WHERE product.category = category.id_category"
    );

  res.render("homepage", { products, categories });
});

app.listen(5000, function () {
  console.log("Server run at port 5000");
});
