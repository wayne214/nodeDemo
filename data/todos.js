const mongoCollections = require("../config/mongoCollections");
const genericData = require('./generic');

const collectionRef = mongoCollections.todos;
const genericTodos = genericData(collectionRef);


genericTodos.findTodosByUserId = async userId => {
    if (!userId) throw "必须提供user_id";
    try {
        const collection = await collectionRef();
        const todos = await collection.find({ userId: userId });
        if ((await todos.count()) === 0) throw "没有找到此用户创建的todos";
        return await todos.toArray();
    } catch (e) {
        throw e;
    }
};

module.exports = genericTodos;
