const express = require('express');
const { SignUP, login , get_all_employees } = require('../controller/userController');
const userRouter = express.Router();
const authentication = require('../middleware/authmiddleware');


userRouter.post('/signup', SignUP);

userRouter.post('/login', login);

userRouter.get('/get/employee' ,authentication, get_all_employees)

module.exports = userRouter