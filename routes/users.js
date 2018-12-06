const express = require("express");
const router = express.Router();
const genericRouter = require("./generic");
const usersData = require("../data").users;

module.exports = genericRouter(usersData, router);
