// StudentList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/iiitn/studentFeesList"
      );
      setStudents(response.data.data); // assuming data is an array of student objects
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch students");
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleToggleFees = async (studentId) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId
        ? { ...student, Fees_Paid: student.Fees_Paid === "NO" ? "YES" : "NO" }
        : student
    );
    setStudents(updatedStudents);

    const updatedStudent = updatedStudents.find(
      (student) => student.id === studentId
    );

    try {
      await axios.put(
        `http://localhost:3001/iiitn/updateStudentFeeStatus/${studentId}`,
        {
          Fees_Paid: updatedStudent.Fees_Paid,
        }
      );
    } catch (err) {
      setError("Failed to update student status");
      setOpenSnackbar(true);
      // Revert the change if the update fails
      setStudents(students);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: 4,
        backgroundColor: "#f0f2f5",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        Student Fee Details
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            width: "100%",
            justifyContent: "center",
            maxWidth: 1000, // Adjust this to fit more cards per row
          }}
        >
          {students.map((student) => (
            <Card
              key={student.id}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: 300, // Controls the card size
                padding: 1,
              }}
            >
              <Avatar sx={{ bgcolor: "#1976d2", marginRight: 2 }}>
                <PersonIcon />
              </Avatar>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {student.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {student.id}
                </Typography>
                <FormControl component="fieldset" sx={{ mt: 1 }}>
                  <RadioGroup
                    row
                    value={student.Fees_Paid}
                    onChange={() => handleToggleFees(student.id)}
                  >
                    <FormControlLabel
                      value="YES"
                      control={<Radio color="success" />}
                      label="Paid"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<Radio color="error" />}
                      label="Not Paid"
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentList;
