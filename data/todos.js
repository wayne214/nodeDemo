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


module.exports = {
   addTodo,
   getTodoById
}