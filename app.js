var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs')
const configRoutes = require('./routes')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', ejs.__express);
// app.set('view engine', 'html');

app.use(logger('dev')); // dev模式 后台打印日志
app.use(express.json()); // 将返回数据格式为json数据
app.use(express.urlencoded({ extended: false })); // 自动把url里除了英文和数字之外的字符，
                                                 // 如中文，自动加密成%2d%3a%4e这样的格式
app.use(cookieParser()); // 浏览器cookie
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件目录

configRoutes(app);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
module.exports = app;
