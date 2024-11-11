import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { CabinSharp } from "@mui/icons-material";
import { deepPurple } from "@mui/material/colors";

function getData(data, Data) {
  let departments = [];
  console.log("student:");
  console.log(data);
  console.log("teacher:");
  console.log(Data);
  for (let i = 0; i < data.length; i++) {
    let flg = 0;
    for (let j = 0; j < Data.length; j++) {
      if (Data[j].CourseName == Object.keys(data[i])) {
        flg = 1;
      }
      break;
    }
    if (flg) {
      departments.push({
        name: Object.keys(data[i]),
        marks: Object.values(data[i]),
        newMarks: "",
      });
    } else {
      departments.push({
        name: Object.keys(data[i]),
        marks: Object.values(data[i]),
        newMarks: "-1",
      });
    }
  }
  console.log("dependences:");
  console.log(departments);
  return departments;
}

const UpdateStudentMarks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  console.log(data);

  const [rollNumber, setRollNumber] = useState("");
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updateEnabled, setUpdateEnabled] = useState(false);
  const [finalMarks, setFinalMarks] = useState(0);

  const handleFetchMarks = async () => {
    setLoading(true);
    setError("");
    setMarksData([]);
    try {
      const response0 = await axios.post(
        "http://localhost:3001/iiitn/course",
        data
      );
      const response1 = await axios.post(
        "http://localhost:3001/iiitn/performance",
        {
          ID: rollNumber,
        }
      );
      const departments = getData(response1.data.data, response0.data.data);

      if (departments.length == 0)
        setError(
          "The selected student have not any of the course that you teach"
        );
      setMarksData(departments);
    } catch (err) {
      setError("Failed to fetch marks. Please enter valid Student ID.");
    } finally {
      setLoading(false);
    }
  };

  const handleNewMarksChange = (index, value) => {
    const updatedMarksData = [...marksData];
    console.log("Value : " + value);
    if (value >= 0);
    updatedMarksData[index].newMarks = value;
    // else updatedMarksData[index].newMarks = updatedMarksData[index].marks[0];
    setMarksData(updatedMarksData);

    // Enable the Update button if any new marks are entered
    const anyNewMarksEntered = updatedMarksData.some(
      (course) => course.newMarks !== ""
    );
    setUpdateEnabled(anyNewMarksEntered);
  };

  const handleUpdateMarks = async () => {
    setLoading(true);
    setError("");
    try {
      let marks = [];
      console.log("marksdata");
      console.log(marksData);
      marksData.forEach((marksdata) => {
        if (marksdata.newMarks && marksdata.newMarks != "-1") {
          marks.push(parseInt(marksdata.newMarks));
        } else if (marksdata.newMarks == "-1") {
          let val = parseInt(marksdata.marks[0]);
          marks.push(val);
        } else {
          marks.push(-1);
        }
      });
      console.log(marks);
      const response = await axios.patch(
        "http://localhost:3001/iiitn/updateMarks",
        {
          ID: rollNumber,
          result: marks,
        }
      );
      if (response.data.success) {
        handleFetchMarks();
      }
    } catch (err) {
      setError("Failed to update marks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Student Performance
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Enter Student ID"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4} align="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleFetchMarks}
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Get Performance"}
            </Button>
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        )}

        {marksData.length > 0 && (
          <>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <strong>Course Name</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Marks Obtained</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Total Marks</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>New Marks</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {marksData.map(
                    (course, index) =>
                      course.newMarks >= 0 && (
                        <TableRow key={index}>
                          <TableCell align="center">{course.name}</TableCell>
                          <TableCell align="center">{course.marks}</TableCell>
                          <TableCell align="center">{100}</TableCell>
                          <TableCell align="center">
                            <TextField
                              type="number"
                              variant="outlined"
                              size="small"
                              value={course.newMarks}
                              onChange={(e) =>
                                handleNewMarksChange(index, e.target.value)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {updateEnabled && (
              <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleUpdateMarks}
                >
                  Update Marks
                </Button>
              </Grid>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default UpdateStudentMarks;
