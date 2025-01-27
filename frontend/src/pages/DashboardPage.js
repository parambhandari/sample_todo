import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import api from "../services/api";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get("/tasks/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response ? error.response.data.message : "Something went wrong"
        );
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Dashboard
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TaskList tasks={tasks} />
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default DashboardPage;
