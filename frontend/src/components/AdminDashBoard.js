import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

var data;

const buttonStyle = {
  backgroundColor: "#9182ad", // Blue color
  color: "white",
  width: "50px", // Fixed width
  height: "50px", // Fixed height to make it square
  border: "none",
  borderRadius: "10px", // Rounded corners
  cursor: "pointer",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function LogoutButton() {
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out");
  };

  return (
    <button onClick={handleLogout} style={buttonStyle}>
      A
    </button>
  );
}

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  data = location.state?.data;

  // State for managing login status
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  console.log(data);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);

    if (!loggedInStatus) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  const handleNavigate = (path) => {
    navigate(path, { state: { data: data } });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(45deg, #6b5b95, #b8a9c9)",
            borderRadius: 3,
            mb: 3,
            p: 2,
            color: "#fff",
            position: "relative", // For positioning the logout button
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" align="center">
            Manage your School efficiently
          </Typography>
          {isLoggedIn && (
            <Avatar
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                cursor: "pointer",
                backgroundColor: "#d32f2f",
              }}
              onClick={handleLogout}
            >
              <LogoutButton />
            </Avatar>
          )}
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                backgroundColor: "#ff7043",
                color: "#fff",
                borderRadius: 2,
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#e64a19",
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => {
                if (data.ROLE === "course_admin" || data.ROLE === "super_admin")
                  handleNavigate("/ManageCourse");
                else
                  window.alert(
                    "The given Admin has no right to access the course settings"
                  );
              }}
            >
              Manage Course
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                backgroundColor: "#29b6f6",
                color: "#fff",
                borderRadius: 2,
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#0288d1",
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => {
                if (data.ROLE === "user_admin" || data.ROLE === "super_admin")
                  handleNavigate("/ManageUser");
                else
                  window.alert(
                    "The given Admin has no right to access the user settings"
                  );
              }}
            >
              Manage User
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
