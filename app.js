'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

//mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/docreatness', { useMongoClient: true });
var db = mongoose.connection;
//mongo error
db.on('error', console.error.bind(console, 'connection error:'));

//use session for tracking logins
app.use(session({
  secret: 'docreatness best app',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//make user ID available in templates
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// setting up routes
var homeRoute = require('./routes/index');
var moviesRoute = require('./routes/movies');
var gamesRoute = require('./routes/games');

app.use('/', homeRoute);
app.use('/movies', moviesRoute);
app.use('/games', gamesRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listening to port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
