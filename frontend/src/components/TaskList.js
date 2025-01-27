import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Task from "./Task";
import {
  fetchTasks,
  updateTask,
  deleteTask,
} from "../redux/action/taskActions";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import socket from "../services/websocket"; 

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  const [editingTaskId, setEditingTaskId] = useState(null); 
  const [taskStatuses, setTaskStatuses] = useState({}); 
  const [snackbarMessage, setSnackbarMessage] = useState(""); 
  const [snackbarOpen, setSnackbarOpen] = useState(false); 

  useEffect(() => {
    dispatch(fetchTasks());
    socket.on("taskUpdate", (updatedTask) => {
      dispatch(updateTask(updatedTask._id, updatedTask));
    });
    return () => {
      socket.off("taskUpdate");
    };
  }, [dispatch]);

  const handleNavigateToCreate = () => {
    navigate("/create-task");
  };

  const handleUpdate = (updatedTask) => {
    dispatch(updateTask(updatedTask._id, updatedTask));
    setEditingTaskId(null); 
    setSnackbarMessage("Task updated successfully");
    setSnackbarOpen(true);
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
    setSnackbarMessage("Task deleted successfully");
    setSnackbarOpen(true);
  };

  const handleStatusChange = (taskId, status) => {
    setTaskStatuses((prevStatuses) => ({
      ...prevStatuses,
      [taskId]: status,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 6 }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Task Manager
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigateToCreate}
            sx={{
              paddingX: 4,
              paddingY: 2,
              fontSize: "1rem",
              boxShadow: 2,
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            + Add Task
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Typography color="error">{`Error: ${error}`}</Typography>
          </Box>
        ) : !tasks || tasks.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Typography color="text.secondary">No tasks available</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {tasks.map((task) =>
              task && task._id ? (
                <Grid item xs={12} sm={6} md={4} key={task._id}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: 3,
                      bgcolor: "background.paper",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.03)",
                      },
                    }}
                  >
                    <CardContent>
                      <Task
                        task={task}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                        isEditing={editingTaskId === task._id} 
                        status={taskStatuses[task._id] || task.status} 
                      />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(task._id)}
                        sx={{ padding: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ) : null
            )}
          </Grid>
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: 6 }}
      />
    </Box>
  );
};

export default TaskList;
