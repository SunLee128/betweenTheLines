const mongoose = require('mongoose');
var resultSchema = new mongoose.Schema({
  key_phrase: Array,
  entities: Array
});

module.exports = mongoose.model('Result', resultSchema)