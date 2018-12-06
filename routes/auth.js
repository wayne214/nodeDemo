const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userData = require("../data/users");
// const authData = require("../data/auth");

const secret = "youwillneverknow";

router.post("/", async (req, res) => {
    const userFromClient = req.body;
    try {
        // 用户登录后，使用secret生成JWT token,内容为userId，7天有效
        const user = await userData.findUserByUserName(userFromClient.username);
        // 验证通过
        if (user.password === userFromClient.password) {
            // jwt生成token的时候，第一个参数是payload，就是token包含的信息，
            // 第二个secret是自己定义的密钥，整个应用用一个，
            // 然后第三个参数是选项，里边配置了下这个token 7天后过期
            const token = jwt.sign({ userId: user._id }, secret, {
                expiresIn: "7d"
            });
            // 保存token到数据库，暂不需要
            // authData.save({ _id: user._id, token });
            res.status(201).json(token);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        res.sendStatus(404);
    }
});

module.exports = router;