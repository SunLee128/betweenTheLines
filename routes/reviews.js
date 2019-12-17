var express = require("express");
var router  = express.Router({mergeParams: true});
var Item = require("../models/item");
var Review = require("../models/review");

router.get('/new', function(req, res) {
	Item.findById(req.params.id, function(err, item) {
		if (err) {
			console.log(err);
		} else {
			res.render('reviews/new', { item: item });
		}
	});
});

router.post('/', function(req, res) {
	// lookup campground using ID
	Item.findById(req.params.id, function(err, item) {
		if (err) {
			console.log(err);
			res.redirect('/items');
		} else {
			Review.create(req.body.review, function(err, review) {
				if (err) {
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

module.exports = router;