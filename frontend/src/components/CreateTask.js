import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../redux/action/taskActions";
import { fetchEmployee } from "../redux/action/authActions"
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees } = useSelector(state => state.auth);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
    assignedTo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await dispatch(addTask(task));
      navigate("/tasks");
    } catch (err) {
      setError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: "8px",
          boxShadow: 3,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create a New Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Task Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Task Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth required margin="normal" sx={{ mb: 2 }}>
            <InputLabel>Task Status</InputLabel>
            <Select
              label="Task Status"
              name="status"
              value={task.status}
              onChange={handleChange}
              variant="outlined"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth required margin="normal" sx={{ mb: 2 }}>
            <InputLabel>Assign to Employee</InputLabel>
            <Select
              label="Assign to Employee"
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleChange}
              variant="outlined"
            >
              {employees.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {error && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{
                bgcolor: loading ? "grey" : "primary.main",
                "&:hover": {
                  bgcolor: loading ? "grey" : "primary.dark",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Task"
              )}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate("/tasks")}
              sx={{
                "&:hover": {
                  bgcolor: "secondary.main",
                  color: "white",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreateTask;
