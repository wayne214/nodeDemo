const userData = require('../data/users');
module.exports = passport => {
    // passport 验证策略，此处为JWT验证
    var JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
    // config passport-jwt
     var opts = {};
     // 配置从何处获取token，此处为从HTTP header的bearer字段中获取
     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
      // JWT加密密钥，整个应用共享
     opts.secretOrKey = "youwillneverknow";
      // 配置passport jwt
     passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
              // 解析 JWT token中的信息，这里保存了用户的ID（会在中间件中自动调用）
                  // 然后根据userId查询user
            try {
                const user = await userData.getById(jwt_payload.userId);
                return done(null, user);
            } catch (e) {
                return done(e, false);
            }
            })
      );
};