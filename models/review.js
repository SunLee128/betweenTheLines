var mongoose = require('mongoose')
var reviewSchema =  mongoose.Schema({
  user_name: String,
  text: String,
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Result"
    }
  ],
});

module.exports = mongoose.model('Review', reviewSchema);