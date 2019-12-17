var mongoose = require('mongoose')
var reviewSchema =  mongoose.Schema({
  user_name: String,
  text: String
});

module.exports = mongoose.model('Review', reviewSchema);