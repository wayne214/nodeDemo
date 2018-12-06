const ObjectID = require("mongodb").ObjectID;
const mongoCollections = require("../config/mongoCollections");
const genericData = require("./generic");
// const userData = require("./users");

// define custom CRUD functions...
const collectionRef = mongoCollections.auth;
const genericAuth = genericData(collectionRef);

// 保存token信息
genericAuth.save = async tokenInfo => {
    const newTokenInfo = { ...tokenInfo, _id: ObjectID(tokenInfo._id) };
    return await genericData.save(newTokenInfo);
};

module.exports = genericAuth;
