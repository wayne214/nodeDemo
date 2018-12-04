const usersData = require("../data").users;
const todosData = require('../data').todos;
const genericRouter = require("./generic");

const userRouter = genericRouter(usersData);

userRouter.get('/:userId/todos', async(req, res) => {
    try {
        const todos = await todosData.findTodosByUserId(req.params.userId);
        res.status(200).json(todos);
    }catch (e) {
        res.sendStatus(404)
    }
});

module.exports = userRouter;
