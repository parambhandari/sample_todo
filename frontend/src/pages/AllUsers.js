import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, deleteUser } from "../redux/action/taskActions";
import { Card, CardContent, Typography, Grid, CircularProgress, Box, Button } from "@mui/material";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleUserDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
      dispatch(getAllUsers())
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        All Users
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" sx={{ textAlign: "center" }}>
          Error: {error}
        </Typography>
      ) : !users ? (
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
          Loading users...
        </Typography>
      ) : users.length === 0 ? (
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
          No users found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Name: {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Phone: {user.mobileNumber || "No phone number"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Role: {user.role }
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUserDelete(user._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AllUsers;
