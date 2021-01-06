const router = express.router();
const ejs = require("ejs");
const bodyParser = require("body-parser");

router.post("/product", function (req, res, next) {
  let data = req.body;
  let product = {
    product_name: data.product_name,
    price: data.price,
    id_category: data.id_category,
  };
});
