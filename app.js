var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sendRouter = require('./routes/send');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Security 
app.disable('x-powered-by')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', usersRouter);

/* logged? */
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.saveto;
  if (cookie === undefined)
  {
    // TODO: validate cookie
    res.render('join', { title: 'F save it' });
  } else {
    next();
  }
  
});

// Routes
app.use('/', indexRouter);
app.use('/', sendRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
