const express = require('express');
const router = express.Router();
const todoData = require('../data').todos;

router.get('/', async (req, res)=> {
    // const todos = [
    //     {
    //         title: "吃水果",
    //         date: new Date(),
    //         completed: false,
    //         description: "保持健康"
    //     },
    //     {
    //         title: "健身",
    //         date: new Date(),
    //         completed: false,
    //         description: "保持更健康"
    //     }
    // ];
    try {
        const todos = await todoData.getAllTodos();
        res.status(200).json(todos);
    }catch (e) {
        res.sendStatus(404)
    }

});

router.post('/', async(req, res) => {
    const todo = req.body;
    try {
        const newTodo = await todoData.addTodo(todo);
        console.log('newtod', newTodo);
        res.status(201).json(newTodo);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const todo = await todoData.getTodoById(req.params.id);
        res.status(200).json(todo);
    }catch (e) {
        res.status(404);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const todo = await todoData.deleteTodoById(req.params.id)
        res.sendStatus(204);
    } catch (e) {
        res.status(404)
    }
})

module.exports = router;