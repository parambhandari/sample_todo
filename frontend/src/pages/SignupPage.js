import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../utils/auth";
import { Button, TextField, Typography, Container, Paper, Checkbox, FormControlLabel } from "@mui/material";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const role = isAdmin ? "admin" : "employee"; 
      await dispatch(signupUser(firstName, lastName, email, mobileNumber, password, role));
      
      navigate("/login");
    } catch (error) {
      setError(error.message || "Signup failed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleSignup}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                color="primary"
              />
            }
            label="Register as Admin"
          />
          <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginTop: 2 }}>
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupPage;
