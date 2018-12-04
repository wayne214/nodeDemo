const todosData = require('../data').todos;
const genericRouter = require('./generic');


module.exports = genericRouter(todosData);