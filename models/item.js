var mongoose = require('mongoose')
var itemSchema = new mongoose.Schema({
  item_name: String,	
  type: String,
  image_url: String,
  description: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
});

module.exports = mongoose.model('Item', itemSchema)