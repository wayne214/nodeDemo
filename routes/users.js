const express = require("express");
const router = express.Router();
const genericRouter = require("./generic");
const usersData = require("../data").users;
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async (req, res) => {
   const user = req.body;
   try {
       const hashedPassword = await bcrypt.hash(user.password, saltRounds);
       user.password = hashedPassword;
       const newUser = await usersData.save(user);
       res.status(201).json(newUser);
   } catch (e) {
       res.sendStatus(500);
   }
});

module.exports = genericRouter(usersData, router);
