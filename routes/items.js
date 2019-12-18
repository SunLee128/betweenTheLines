var express = require("express");
var router  = express.Router();
var Item = require("../models/item");

//index - show all items
router.get('/', function(req, res) {
	Item.find({}, function(err, allitems) {
		if (err) {
			console.log(err);
		} else {
			res.render('items/index', { items: allitems });
		}
	});
});

//create - add new item to db
router.post('/', function(req, res) {
	var item_name = req.body.name;
	var image_url = req.body.image_url;
	var type = req.body.type;
	var desc = req.body.description;
	var newItem = { item_name: item_name, image_url: image_url, type: type, description: desc };
	Item.create(newItem, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/items');
		}
	});
});

//NEW form to create a new item
router.get('/new', function(req, res) {
	res.render('items/new');
});

//SHOW  more info on an item
router.get('/:id', function(req, res) {
	Item.findById(req.params.id).populate('reviews').exec(function(err, foundItem) {
		if (err) {
			console.log(err);
		} else {
			// console.log(foundItem);
			res.render('items/show', { item: foundItem });
		}
	});
});

// EDIT item - to show the form
router.get("/:id/edit", function(req, res){
	Item.findById(req.params.id, function(err, foundItem){
			res.render("items/edit", {item: foundItem});
	});
});

// UPDATE an item
router.put("/:id", function(req, res){
	Item.findByIdAndUpdate(req.params.id, req.body.item, function(err, updatedItem){
		 if(err){
				 res.redirect("/items");
		 } else {
				 res.redirect("/items/" + req.params.id);
		 }
	});
});

// DESTROY  
router.delete("/:id", function(req, res){
	Item.findByIdAndRemove(req.params.id, function(err){
		 if(err){
				 res.redirect("/items");
		 } else {
				 res.redirect("/items");
		 }
	});
});

module.exports = router;