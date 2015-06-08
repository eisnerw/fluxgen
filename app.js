var express       = require('express');
var app           = express();
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var flash         = require('connect-flash');
var mongoose      = require('mongoose');
var session       = require('express-session');
var emitters      = require('./emitters');
var MongoStore    = require('connect-mongo')(session);

//socket.io
var server        = app.listen(4000);
var io            = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

io.on('connection', function(socket) {
   console.log('a user connected');
});

io.on('connection', function(socket){
  socket.on('message', function(msg){
    console.log('message: ' + msg);
  });

  io.emit('message', 'Hello from server');
});

emitters.emitter.on('data', function(data) {
   io.emit('data', data);
});

//Database config
var db            = require('./config/db.js');

//Configuration
mongoose.connect(db.url);  //connect to db

//Set up express app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Routes
var api = require('./routes/api');
app.use('/api', api);

var routes = require('./routes/index')(app);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


///////////////////
// error handlers
///////////////////

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