var express = require("express");
var router  = express.Router({mergeParams: true});
var Item = require("../models/item");
var Review = require("../models/review");
var Result = require("../models/result");
var getSentiments = require("../helpers/getSentiments")

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
          getSentiments.get_sentiments(document)
            .then(({ data, status }) => {
              if (status == 200) {
                //create new Result
                var review_results = new Result({
                  sentiment: data.documents[0].sentiment,
                  positive: data.documents[0].documentScores.positive,
                  neutral: data.documents[0].documentScores.neutral,
                  negative: data.documents[0].documentScores.negative
                 }); 
                 review_results.save(function(err, newResults) {
                   if(err) {
                     console.log(err)
                   } else {
                     review.results = newResults;
                     review.save()
                   }
                 })
                res.redirect('/items/' + item._id);
              }
            })
            .catch(err => console.log(err))
				}
			});
		}
	});
});

router.delete("/:review_id", function(req, res){
  Review.findByIdAndRemove(req.params.review_id, function(err){
     if(err){
         res.redirect("back");
     } else {
         res.redirect("/items/" + req.params.id);
     }
  });
});

module.exports = router;