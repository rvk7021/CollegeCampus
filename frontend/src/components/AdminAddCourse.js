import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  Typography,
  MenuItem,
  responsiveFontSizes,
} from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";

const AddCourse = () => {
  const [CourseID, setCourseID] = useState("");
  const [CourseName, setCourseName] = useState("");
  const [InstructorId, setInstructorId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAddCourse = async () => {
    if (!CourseName || !CourseID || !departmentId || !InstructorId) {
      setSnackbarMessage("Please fill out all Course fields.");
      setOpenSnackbar(true);
      return;
    }

    const AddCourseBackendURL = "http://localhost:3001/iiitn/adminAddCourse";

    let Coursedata = {
      CourseID: CourseID,
      CourseName: CourseName,
      departmentId: departmentId,
      InstructorId: InstructorId,
    };

    let response = await axios.post(AddCourseBackendURL, Coursedata);

    if (response.data.success) {
      setSnackbarMessage("Course added successfully.");
    } else {
      setSnackbarMessage(response.data.message);
    }
    setOpenSnackbar(true);
    resetForm();
  };

  const resetForm = () => {
    setCourseID("");
    setCourseName("");
    setInstructorId("");
    setDepartmentId("");
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add Course
      </Typography>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Course ID"
          value={CourseID}
          onChange={(e) => setCourseID(e.target.value)}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Course Name"
          value={CourseName}
          onChange={(e) => setCourseName(e.target.value)}
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Instructor ID"
          value={InstructorId}
          onChange={(e) => setInstructorId(e.target.value)}
          type="InstructorId"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Department ID"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          variant="outlined"
        />

        <Button variant="contained" color="primary" onClick={handleAddCourse}>
          Add Course
        </Button>
      </Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddCourse;
