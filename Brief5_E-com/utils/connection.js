const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "e-com",
});

connection.connect(function (err) {
  if (err) throw err;
});

exports.connection = connection;