import React from "react";
import axios from "axios";
import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = (onManageStudentProfiles) => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  console.log(data);

  const handleNavigate = (path) => {
    navigate(path, { state: { data: data } });
  };
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Profile Management
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Choose an action to proceed with your profile management:
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => handleNavigate("/updateDetails")}
            >
              Update My Profile
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              onClick={() => {
                handleNavigate("/addStudent");
              }}
            >
              Manage Student in Courses
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UpdateProfile;
