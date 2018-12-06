var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var passport = require('passport');


const configRoutes = require('./routes');
const configPassport = require('./config/configPassport');

configPassport(passport);


var app = express();


app.use(logger('dev')); // dev模式 后台打印日志
app.use(express.json()); // 将返回数据格式为json数据
app.use(express.urlencoded({ extended: false })); // 自动把url里除了英文和数字之外的字符，
                                                 // 如中文，自动加密成%2d%3a%4e这样的格式
app.use(cookieParser()); // 浏览器cookie
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件目录

app.use(passport.initialize());
configRoutes(app);


module.exports = app;
