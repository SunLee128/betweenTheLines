// var d3 = require('d3');
// var Result = require("../models/result");

// var data = Result.find().where('sentiment').equals('positive')
// console.log(data)

// Athlete.
//   find().
//   where('sport').equals('Tennis').
var Result = require("../models/result");
const mongoose = require('mongoose');

Result.find({},function(err,data){
  if(err){
    console.log(err)
  } else {
    console.log(data)
  }
})