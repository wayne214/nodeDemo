const mongoCollections = require('../config/mongoCollections');
const todos = mongoCollections.todos;
const ObjectID = require('mongodb').ObjectID;

const addTodo = async todo => {
        try {
            const todoCollection = await todos();
            const insertInfo = await todoCollection.insertOne(todo);
            console.log('***',insertInfo);
            if (insertInfo.insertedCount === 0) throw "添加todo失败";
            const newId = insertInfo.insertedId;
            console.log('---',newId);
            return getTodoById(newId);
        } catch (e) {
            throw e
        }
    };
// 查询
const getTodoById = async id => {
        if (!id) throw "必须提供todo id";
        try {
            const todoCollection = await todos();
            const todo = await todoCollection.findOne({ _id: ObjectID(id) });
            if (todo === null) throw "没有找到此todo";
            return todo;
        } catch (e) {
            throw e;
        }
    };
// 获取所有
const getAllTodos = async (todo) => {
    try {
        const todoCollection = await todos();
        const todoList = await todoCollection.find().toArray();
        return todoList;
    } catch (e) {
        throw e;
    }
};
// 删除
const deleteTodoById = async (id) => {
    if (!id) throw "必须提供todo id";
    try {
        const todoCollection = await todos();
        const deleteInfo = await todoCollection.deleteOne({_id: ObjectID(id)});
        console.log('deleteInfo', deleteInfo);
        if (deleteInfo.deletedCount === 0) throw "删除此TODO失败";
        return deleteInfo.deletedCount;
    } catch (e) {
        throw e;
    }
};

// 更新
const updateTodoById = async (id) => {
    if (!id) throw "必须提供todo id";
    try {
        const todoCollection = await todos();
        const updateInfo = await todoCollection.updateOne({_id: ObjectID(id)}, {
            $set: {title: 'dragosoft'}
        });
        if (updateInfo.matchedCount === 0) throw "更新此TODO失败"
        return updateInfo.upsertedId;
    }catch (e) {
        throw e
    }
};
module.exports = {
   addTodo,
   getTodoById,
   getAllTodos,
   deleteTodoById,
   updateTodoById
};