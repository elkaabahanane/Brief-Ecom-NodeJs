const connection = require("./utils/connection");
const express = require("express");
const app = express();

app.listen(5000, function () {
  console.log("Server run at port 5000");
});
