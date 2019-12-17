var express = require("express");
var router  = express.Router();
var Item = require("../models/item");

router.get('/', function(req, res) {
	Item.find({}, function(err, allitems) {
		if (err) {
			console.log(err);
		} else {
			res.render('items/index', { items: allitems });
		}
	});
});

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

router.get('/new', function(req, res) {
	res.render('items/new');
});

router.get('/:id', function(req, res) {
	Item.findById(req.params.id).populate('reviews').exec(function(err, foundItem) {
		if (err) {
			console.log(err);
		} else {
			console.log(foundItem);
			res.render('items/show', { item: foundItem });
		}
	});
});

module.exports = router;