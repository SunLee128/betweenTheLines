const mongoose = require('mongoose');
var resultSchema = new mongoose.Schema({
  sentiment: String,
  positive: Number,
  neutral: Number,
  negative: Number
});

module.exports = mongoose.model('Result', resultSchema)