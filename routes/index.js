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
const authRoutes = require('./auth');

const constructorMethod = app => {
    app.use('/api/users', userRoutes);

    app.use('/api/todos', todoRoutes);

    app.use('/api/auth', authRoutes);

    // app.use('/test', (req, res, next)=> {
    //     console.log('test1');
    //     next();
    // },(req, res)=> {
    //     console.log('test2');
    //     res.sendStatus(200)
    // });

    app.use('*', (req, res) => {
        res.sendStatus(404)
    })
}

module.exports = constructorMethod;