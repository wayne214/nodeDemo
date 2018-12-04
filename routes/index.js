// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('hello', { title: 'Express' });
// });
//
// module.exports = router;
const userRoutes = require('./users');
const todoRoutes = require('./todo');

const constructorMethod = app => {
    app.use('/api/users', userRoutes);

    app.use('/api/todos', todoRoutes);

    app.use('*', (req, res) => {
        res.sendStatus(404)
    })
}

module.exports = constructorMethod;