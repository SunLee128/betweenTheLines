var mongoose = require('mongoose')
var reviewSchema =  mongoose.Schema({
  user_name: String,
  text: String,
  results: 
    {
      sentiment: String,
      positive: Number,
      neutral: Number,
      negative: Number
    },
});

module.exports = mongoose.model('Review', reviewSchema);