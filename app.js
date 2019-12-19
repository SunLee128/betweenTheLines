var express = require('express');
var favicon = require('express-favicon');
var app = express();
var PORT = process.env.PORT || 3001;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override")
var d3 = require('d3');
require('dotenv').config();
//import routes
var reviewRoutes = require('./routes/reviews');
var itemRoutes = require('./routes/items');
var indexRoutes = require('./routes/index');

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost:27017/betweenTheLines',
	{ useNewUrlParser: true },
	{ useUnifiedTopology: true }
);
// mongoose.Promise = Promise;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(methodOverride("_method"));

// const publicDirectoryPath = path.join(__dirname, 'public/stylesheets');
// const staticDirectory =  express.static(publicDirectoryPath);
// app.use(staticDirectory);


//routers
app.use("/", indexRoutes);
app.use("/items", itemRoutes);
app.use("/items/:id/reviews", reviewRoutes);

app.listen(PORT, () => {
	`server listening on port ${PORT}`;
});