var d3 = require('d3');
var Result = require("../models/result");

var data = Result.find().where('sentiment').equals('positive')
console.log(data)

// Athlete.
//   find().
//   where('sport').equals('Tennis').