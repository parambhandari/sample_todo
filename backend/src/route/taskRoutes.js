const express = require('express');
const taskRouter = express.Router();
const { createTask ,getAllTasks ,updateTask ,deleteTask ,getAllUsers ,assignTaskToUser , deleteUser} = require('../controller/taskController');
const authentication = require('../middleware/authmiddleware');


taskRouter.post('/create',authentication, createTask);


taskRouter.get('/get',authentication, getAllTasks);


taskRouter.put('/update/:taskId',authentication, updateTask);


taskRouter.delete('/delete/:taskId',authentication,deleteTask);


taskRouter.get("/users", authentication, getAllUsers);


taskRouter.post("/tasks/assign", authentication, assignTaskToUser);


taskRouter.delete("/delete-user/:userId", authentication, deleteUser)

module.exports = taskRouter;
