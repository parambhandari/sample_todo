import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../utils/auth";
import { Button, TextField, Typography, Container, Paper } from "@mui/material";

const LoginPage = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser(emailOrMobile, password));
      if (response.type === "LOGIN_SUCCESS") {
        navigate("/tasks");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email or Mobile"
            variant="outlined"
            fullWidth
            margin="normal"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
