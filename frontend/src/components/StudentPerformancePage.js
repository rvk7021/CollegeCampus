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

function getData(Data) {
  // let departments = [{ a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }];
  console.log("data");
  Data = Data.data;
  console.log(Data);
  const departments = [
    { name: Object.keys(Data[0]), marks: Object.values(Data[0]) },
    { name: Object.keys(Data[1]), marks: Object.values(Data[1]) },
    { name: Object.keys(Data[2]), marks: Object.values(Data[2]) },
    { name: Object.keys(Data[3]), marks: Object.values(Data[3]) },
    { name: Object.keys(Data[4]), marks: Object.values(Data[4]) },
  ];
  return departments;
}

const StudentPerformance = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchMarks = async () => {
    setLoading(true);
    setError("");
    setMarksData([]);
    try {
      const response = await axios.post(
        "http://localhost:3001/iiitn/performance",
        { ID: rollNumber }
      );
      const departments = getData(response.data);
      setMarksData(departments);
    } catch (err) {
      setError("Failed to fetch marks. Please enter valid Student ID.");
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
                </TableRow>
              </TableHead>
              <TableBody>
                {marksData.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{course.name}</TableCell>
                    <TableCell align="center">{course.marks}</TableCell>
                    <TableCell align="center">{100}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default StudentPerformance;
