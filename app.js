var express = require('express');
var app = express();
const PORT = process.env.PORT || 3001;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

//routers
app.use("/", indexRoutes);
app.use("/items", itemRoutes);
app.use("/items/:id/reviews", reviewRoutes);

app.listen(PORT, () => {
	`server listening on port ${PORT}`;
});
