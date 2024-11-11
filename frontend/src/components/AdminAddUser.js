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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  responsiveFontSizes,
} from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";

const AddUser = () => {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [contact_Number, setContact_Number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [courseIds, setCourseIds] = useState(Array(5).fill(""));
  const [fees, setFees] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (role === "student") {
      setDepartmentId("");
      setFees("");
      setCourseIds(Array(5).fill(""));
    }
  }, [role]);

  const handleAddUser = async () => {
    if (!userName || !contact_Number || !role || !email || !password) {
      setSnackbarMessage("Please fill out all user fields.");
      setOpenSnackbar(true);
      return;
    }
    // Validate contact number
    if (!/^\d{10}$/.test(contact_Number)) {
      setSnackbarMessage("Contact number must be exactly 10 digits.");
      setOpenSnackbar(true);
      return;
    }
    if (
      role === "student" &&
      (fees === "" || departmentId === "" || courseIds.some((id) => id === ""))
    ) {
      setSnackbarMessage("Please fill out all student fields.");
      setOpenSnackbar(true);
      return;
    }

    const AddUserBackendURL = "http://localhost:3001/iiitn/adminAddUser";

    let Userdata = {
      userName: userName,
      role: role,
      contact_Number: contact_Number,
      email: email,
      password: password,
    };

    if (role == "student") {
      for (let i = 0; i < 5; i++) {
        courseIds[i] = parseInt(courseIds[i], 10);
      }
      Object.assign(Userdata, {
        departmentId: parseInt(departmentId, 10),
        fees: fees,
        courseIds: courseIds,
      });
    }

    let response = await axios.post(AddUserBackendURL, Userdata);

    if (response.data.success) {
      setSnackbarMessage("User added successfully.");
    } else {
      setSnackbarMessage(response.data.message);
    }
    setOpenSnackbar(true);
    resetForm();
  };

  const resetForm = () => {
    setUserName("");
    setRole("");
    setContact_Number("");
    setEmail("");
    setPassword("");
    setDepartmentId("");
    setCourseIds(Array(5).fill(""));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add User
      </Typography>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
        />
        <TextField
          fullWidth
          select
          label="User Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Contact Number"
          value={contact_Number}
          onChange={(e) => setContact_Number(e.target.value)}
          type="tel"
          inputProps={{ pattern: "\\d{10}" }} // Enforce 10 digit pattern
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          variant="outlined"
        />
        {role === "student" && (
          <>
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Fees Paid</FormLabel>
                <RadioGroup
                  row
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                >
                  <FormControlLabel
                    value="YES"
                    control={<Radio />}
                    label="YES"
                  />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
            </div>
            <TextField
              fullWidth
              label="Department ID"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              variant="outlined"
            />
            {courseIds.map((courseId, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Course ${index + 1} ID`}
                value={courseId}
                onChange={(e) => {
                  const newCourseIds = [...courseIds];
                  newCourseIds[index] = e.target.value;
                  setCourseIds(newCourseIds);
                }}
                variant="outlined"
              />
            ))}
          </>
        )}
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add User
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

export default AddUser;
