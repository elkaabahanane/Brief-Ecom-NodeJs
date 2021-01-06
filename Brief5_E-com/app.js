const connection = require("./utils/connection");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");

//Set view engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async function (req, res, next) {
  const [categories] = await connection
    .promise()
    .query("SELECT * FROM category order by id_category asc");
  const [products] = await connection
    .promise()
    .query(
      "SELECT * FROM product, category WHERE product.category = category.id_category order by product.id_product asc"
    );

  res.render("homepage", { products, categories });
});

app.get("/add", async function (req, res) {
  const [categories] = await connection
    .promise()
    .query("SELECT * FROM category");

  res.render("add", { categories });
});

app.use(productRouter);
app.use(categoryRouter);

app.listen(5000, function () {
  console.log("Server run at port 5000");
});
