var express = require("express");
var router  = express.Router({mergeParams: true});
var Item = require("../models/item");
var Review = require("../models/review");
var Result = require("../models/result");
var getSentiments = require("../helpers/getSentiments")
var getKeyPhrases = require("../helpers/getKeyPhrases")

//NEW form to create a new review
router.get('/new', function(req, res) {
	Item.findById(req.params.id, function(err, item) {
		if (err) {
			console.log(err);
		} else {
			res.render('reviews/new', { item: item });
		}
	});
});

//create add new review
router.post('/', function(req, res) {
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
          // make API call
          var body = req.body.review.text
          var document = {
              documents: [
                {
                  id: '1',
                  text: body
                },
              ]
            };
          // getKeyPhrases.get_key_phrases(document), function (error, response, body) {
          //   if (!error && response.statusCode == 200) {
          //       console.log("sdlkfj"); // Show the HTML for the Modulus homepage.
          //       res.redirect("/items")
          //   }
          // },
          getSentiments.get_sentiments(document), function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body.documents[0]); 
                res.redirect('/items/' + item._id);
            }
          }
				}
			});
		}
	});
});

module.exports = router;