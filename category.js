const express = require('express');
const app = express();
 var bodyParser = require('body-parser');
  app.set('view engine', 'ejs');
  app.get('/', function(req, res) {
    res.render('table');
});
var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
     user     : 'root',
    password : '',
    database: 'e-com'
 });
   var urlencodedParser = bodyParser.urlencoded({
    extended: false
   })
   connection.connect(function (error) {
     //condition connect
      if (!!error) {
         console.log('Failed to connect :(');
      } else {
          console.log('Connected :D');
     }
 });
 app.post('/addcategory', urlencodedParser, function(req, res) {
  const category = {}
  category.id_category = req.body.id_category
  category.name_category = req.body.name_category
  connection.query('INSERT INTO category SET ?', category, (err, _res) => {
     if(err) throw err;
  });
  res.render('table');
});
app.get("/addcategory", (req, res) => {
  connection.query('SELECT * FROM category', (err, rows) => {
      if (err) {
          console.log("Error getting data")
      } else {
        res.render('addcategory',{ category : rows})
      }
  })
});



app.post('/updatecateg', urlencodedParser, (req, res) => {
  let reqbody1 = [req.body.name_category , req.body.id]
  let sql = 'UPDATE `category` SET `name_category`=?, where `id_category`=?'

  connection.query(sql, reqbody1 ,  (error)  =>  {
     if (error) {
         console.log("NO CHANGE DATA")
     } else {
         console.log("Data have been changed")
     }

   });
   res.redirect('table')
});

app.get("/updatecateg", (req, res) => {
  connection.query('SELECT * FROM category', (err, rows) => {
      if (err) {
          console.log("Error getting data")
      } else {
        res.render('updatecateg',{ category : rows})
      }
  })
});
 
app.get("/table", (_req, res) => {
  connection.query('SELECT * FROM category', (err, rows) => {
      if (err) {
          console.log("Error getting data")
      } else {
        res.render('table',{ category : rows})
      }
  })
});

connection.query('SELECT * FROM category', (err,result) => {
  if(err) throw err;
 console.log('Data received :');
 console.log(result);
});

app.get('/delete/:id',(req, res) => {
  var sql = "DELETE from category where id_category = ?";
  db.query(sql,[req.params.id],(err) => {
      if(err) throw err;
      res.redirect('/');
  });
});



 
 

app.listen(process.env.port || 3000,function(){
    console.log('now listening for request');
});

