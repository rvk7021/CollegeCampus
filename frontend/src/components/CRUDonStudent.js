import React from "react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AddStudentForm from "./AddStudent";

import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const CRUDonStudent = ({ onUpdateStudent, onRemoveStudent }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  console.log(data);

  const handleNavigate = (path) => {
    navigate(path, { state: { data: data } });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom color="primary">
          Manage Student Profiles
        </Typography>
        <Typography variant="body1" paragraph>
          Choose an action to manage student profiles:
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="success"
              size="large"
              fullWidth
              startIcon={<AddIcon />}
              sx={{
                py: 2,
                borderRadius: 2,
                boxShadow: 4,
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={() => {
                handleNavigate("/addStudent");
              }}
            >
              Add Student
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="error"
              size="large"
              fullWidth
              startIcon={<DeleteIcon />}
              sx={{
                py: 2,
                borderRadius: 2,
                boxShadow: 4,
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={onRemoveStudent}
            >
              Remove Student
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Box mt={4} sx={{ textAlign: "center" }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" color="textSecondary">
          Manage student profiles with ease using the options above. Each option
          will guide you through the respective process.
        </Typography>
      </Box>
    </Container>
  );
};

export default CRUDonStudent;
