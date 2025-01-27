import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/">
                Dashboard
              </Button>

              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
              <Button color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
