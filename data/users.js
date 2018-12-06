const mongoCollections = require("../config/mongoCollections");
const genericData = require("./generic");

// define custom CRUD functions...
const collectionRef = mongoCollections.users;

const genericUsers = genericData(collectionRef);

genericUsers.findUserByUserName = async username => {
    if (!username) throw "用户名不能为空";
    try {
        const collection = await collectionRef();
        const user = await collection.findOne({ username });
        if (!user) throw "没有找到对应用户";
        return user;
    } catch (e) {
        throw e;
    }
};

module.exports = genericUsers;