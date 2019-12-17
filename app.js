var express = require("express");
var app = express();
const PORT = process.env.PORT || 3001
var bodyParser = require("body-parser")
var mongoose = require('mongoose')

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
//landing page
app.get('/', function(req,res){
  res.render("landing")
})

var items = [
  {item_name: "vegemite", image: "https://cdn0.woolworths.media/content/wowproductimages/medium/281263.jpg"}, 
  {item_name: "Frozen 2", image: "https://cooroy.com.au/wp-content/uploads/2015/01/Disney-Frozen-Movie-small.jpg"},{item_name: "General Assembly", image: "https://findvectorlogo.com/wp-content/uploads/2018/12/general-assembly-vector-logo.png"}
]

app.get('/items', function(req,res) {
  res.render('items', {items})
})

app.post('/items', function(req,res) {
  var name = req.body.name;
  var image = req.body.image;
  var type = req.body.type;
  var address = req.body.address;
  var contactNumber= req.body.contactNumber;
  res.redirect('/items')
})

app.get('/items/new', function(req,res) {
  res.render('new.ejs')
})


app.listen(PORT, () => { `server listening on port ${PORT}`})