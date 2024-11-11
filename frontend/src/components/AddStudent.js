import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddStudentForm = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [sourceCourse, setSourceCourse] = useState("");
  const [destinationCourse, setDestinationCourse] = useState("");
  const [courses1, setCourses1] = useState([]);
  const [courses2, setCourses2] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  useEffect(() => {
    const fetchCourses = async (data) => {
      try {
        console.log(data);
        let response1 = await axios.post(
          "http://localhost:3001/iiitn/course",
          data
        );
        setCourses1(response1.data.data);
        let response2 = await axios.post("http://localhost:3001/iiitn/course");
        setCourses2(response2.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses(data);
  }, [data]);

  // console.log(courses1);
  const handleNavigate = (path) => {
    navigate(path, { state: { data: data } });
  };

  const handleAddStudent = async () => {
    try {
      // Logic to move the student from sourceCourse to destinationCourse
      console.log("Roll Number:", rollNumber);
      console.log("Source Course:", sourceCourse);
      console.log("Destination Course:", destinationCourse);
      const changeCourseURL = "http://localhost:3001/iiitn/course";
      let response = await axios.patch(changeCourseURL, {
        ID: rollNumber,
        oldID: sourceCourse,
        newID: destinationCourse,
      });
      console.log(response);
      if (response.data.success) {
        window.alert("Successfully change the course");
      }
    } catch (error) {
      console.log("Error in add student:" + error);
      throw error;
    }
    // Implement the logic for moving the student here

    // Redirect or show success message
    // navigate("/manage-student-profiles");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Move Student to Another Course
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Student Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Source Course</InputLabel>
              <Select
                value={sourceCourse}
                onChange={(e) => setSourceCourse(e.target.value)}
                label="Source Course"
                required
              >
                {courses1.map((course) => (
                  <MenuItem key={course.ID} value={course.ID}>
                    {course.CourseName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Destination Course</InputLabel>
              <Select
                value={destinationCourse}
                onChange={(e) => setDestinationCourse(e.target.value)}
                label="Destination Course"
                required
              >
                {courses2.map((course) => (
                  <MenuItem key={course.ID} value={course.ID}>
                    {course.CourseName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleAddStudent}
            >
              Move Student
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AddStudentForm;
