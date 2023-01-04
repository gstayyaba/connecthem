var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var adminRouter = require('./routes/admin/index')
var studentRouter = require('./routes/student/index')
var ngoRouter = require('./routes/ngo/index')
var companyRouter = require('./routes/company/index')
var indexRouter = require('./routes/index/get')
var bossRouter = require('./routes/boss/index')

require('./db/index')

var app = express();

// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "pug")


app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/student', studentRouter);
app.use('/ngo', ngoRouter);
app.use('/company', companyRouter);
app.use('/boss', bossRouter);

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
  res.render('index/error');
});

module.exports = app;
