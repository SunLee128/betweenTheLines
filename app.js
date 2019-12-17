var express = require("express");
var app = express();
const PORT = process.env.PORT || 3001
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Item = require('./models/item');
var Review = require('./models/review')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/betweenTheLines',{ useNewUrlParser: true }, { useUnifiedTopology: true });
// mongoose.Promise = Promise;

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));


//landing page
app.get('/', function(req,res){
  res.render("landing")
})

app.get('/items', function(req,res) {
  Item.find({},function(err, allitems){
    if(err){
      console.log(err);
    } else {
      res.render('items/index', {items:allitems})
    }
  })
})

app.post('/items', function(req,res) {
  var item_name = req.body.name;
  var image_url = req.body.image_url;
  var type = req.body.type;
  var desc = req.body.description;
  var newItem = {item_name: item_name, image_url: image_url, type: type, description: desc}
  Item.create(newItem, function(err, newlyCreated){
    if(err) {
      console.log(err);
    } else {
      res.redirect('/items')
    } 
  })
})

app.get('/items/new', function(req,res) {
  res.render('items/new')
})

app.get('/items/:id', function(req,res) {
  Item.findById(req.params.id).populate("reviews").exec(function(err,foundItem){
    if(err) {
      console.log(err);
    } else {
      console.log(foundItem)
      res.render('items/show',{item: foundItem})
    }
  })
})

app.get('/items/:id/reviews/new', function(req,res) {
    Item.findById(req.params.id,function(err,item){
      if(err){
        console.log(err)
      } else {
        res.render('reviews/new', {item: item})
      }
    })
})

app.post('/items/:id/reviews', function(req, res){
  console.log("slkfjkadsjl")
  // lookup campground using ID
  Item.findById(req.params.id, function(err, item){
      if(err){
          console.log(err);
          res.redirect("/items");
      } else {
          Review.create(req.body.review, function(err, review){
          if(err){
              console.log(err);
          } else {
              item.reviews.push(review);
              item.save();
              res.redirect('/items/' + item._id);
          }
       });
      }
  });
});

app.listen(PORT, () => { `server listening on port ${PORT}`})
