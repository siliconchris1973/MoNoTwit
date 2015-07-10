var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// connect to mongo
var mongo = require('mongodb');
var monk = require('monk');
//our db connection data is stored in an extra file
var dbcon = require('./conf/mongodbconf.js');
var db = monk('localhost:27017/nodetest1');
//var db = monk(dbcon.dbhost + ':' + dbcon.dbport + '/' + dbcon.dbset);


// define the routes for later use
var routes = require('./routes/index');
var users = require('./routes/users');
var tweets = require('./routes/tweets');
var about = require('./routes/about');
var contact = require('./routes/contact');
//var streamtwitter = require('./streamtwitter');

// define the app to be an instance of express framework
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// standard usage section
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Make our db accessible to our router
app.use(function(req,res,next){
	// the db here, is the monk connection object to the mongodb db
    req.db = db;
    next();
});




// define routes to certain web parts
app.use('/', routes);
app.use('/users', users);
app.use('/tweets', tweets);
app.use('/about', about);
app.use('/contact', contact);
//app.use('/streamtwitter', streamtwitter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

