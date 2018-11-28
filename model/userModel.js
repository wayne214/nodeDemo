var mongoose = require('mongoose'),
DB_URL = 'mongodb://localhost:27017/userdb';
mongoose.Promise = global.Promise;

mongoose.connect(DB_URL);
/**
 * 连接成功
 * */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
});

var model = mongoose.model('user', userSchema);

module.exports = model;