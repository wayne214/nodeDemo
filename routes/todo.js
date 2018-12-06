const express = require("express");
const router = express.Router();

const todosData = require('../data').todos;
const passport = require("passport");
const genericRouter = require('./generic');

// 中间第二个使用passport的参数为中间件，即在处理request之前先执行，这里
// 就是我们在app.js中配置的passport-jwt回调函数，然后验证成功后req会多
// 一个user属性，就是回调函数返回的第二个参数 app.js: return done(null, jwt_payload);
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            // 获取user对象中的userId的值
            const { _id } = req.user;
            const todos = await todosData.findTodosByUserId(_id.toString());
            res.status(200).json(todos);
        } catch (e) {
            res.sendStatus(404);
        }
    }
);
module.exports = genericRouter(todosData, router);