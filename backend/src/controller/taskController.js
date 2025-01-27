const Task = require('../model/taskModel');
const User = require("../model/userModel")
const WebSocket = require('ws');
let clients = [];

exports.getAllUsers = async (req, res) => {
    try {
      const currentUserId = req._id; 
  
      if (!currentUserId) {
        return res.status(401).json({ success: false, message: 'User is missing' });
      }
  
      const users = await User.find({ _id: { $ne: currentUserId } }).select('firstName lastName email mobileNumber role');
      if (!users || users.length === 0) {
        return res.status(404).json({ success: false, message: 'No users found' });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Fetched all users successfully',
        data: users,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const currentUserId = req._id; 
  
      if (!currentUserId) {
        return res.status(401).json({ success: false, message: 'Authentication required. User is missing.' });
      }
  
      const { userId } = req.params; 
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
  
      const deleteUser = await User.findByIdAndDelete(userId); 
  
      if (!deleteUser) {
        return res.status(404).json({ success: false, message: "Failed to delete user. User not found." });
      }
  
      return res.status(200).json({ success: true, message: "User successfully deleted" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
 
  exports.assignTaskToUser = async (req, res) => {
    try {
      const currentUserId = req._id; 
      const { title, description, assignedTo } = req.body;
  
      if (!currentUserId) {
        return res.status(401).json({ success: false, message: 'User is missing' });
      }
  
      if (!title || !assignedTo) {
        return res.status(400).json({
          success: false,
          message: 'Title and assignedTo are required fields',
        });
      }
      const userExists = await User.findById(assignedTo);
      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: 'Assigned user not found',
        });
      }
      const newTask = new Task({
        title,
        description,
        assignedTo,
        createdBy: currentUserId,
      });
  
      const savedTask = await newTask.save();
  
      return res.status(201).json({
        success: true,
        message: 'Task assigned successfully',
        data: savedTask,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };



  exports.createTask = async (req, res) => {
    try {
      const { title, description, assignedTo } = req.body;
  
      if (!assignedTo) {
        return res
          .status(400)
          .json({ success: false, message: "Please assign the task to an employee." });
      }
  
      const assignedEmployee = await User.findOne({ _id: assignedTo, role: "employee" });
      if (!assignedEmployee) {
        return res
          .status(404)
          .json({ success: false, message: "Assigned employee not found or is not an employee." });
      }
  
   
      const newTask = new Task({
        title,
        description,
        assignedTo,
        createdBy: req.userId, 
      });
  
      await newTask.save();
  
      res.status(201).json({ success: true, task: newTask });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  
  

exports.getAllTasks = async (req, res) => {
    try {
      const { status, assignedTo } = req.query;

      const query = {};
      if (status) query.status = status;
      if (assignedTo) query.assignedTo = assignedTo;

      const tasks = await Task.find(query)
        .populate("assignedTo", "firstName lastName email")
        .populate("createdBy", "firstName lastName email");
  
      return res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        data: tasks,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

  
  exports.updateTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const updates = req.body;
 
      const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }

      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'taskUpdate', task: updatedTask }));
        }
      });

      res.status(200).json({ success: true, task: updatedTask });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  
  exports.deleteTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  