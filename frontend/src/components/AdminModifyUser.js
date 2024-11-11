import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const ModifyUser = () => {
  const [userID, setUserID] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleFetchUser = async () => {
    if (!userID) {
      setSnackbarMessage("Please enter a user ID.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      let id = parseInt(userID, 10);
      const response = await axios.get(
        `http://localhost:3001/iiitn/adminViewUser/${id}`
      );
      if (response.data.success) {
        setUserData(response.data.data);
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage("User not found.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("Error while fetching the user");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleUpdateUser = async () => {
    if (!userData) {
      setSnackbarMessage("No user data to update.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      let id = parseInt(userID, 10);
      const response = await axios.patch(
        `http://localhost:3001/iiitn/adminUpdateUser/${id}`,
        userData
      );
      if (response.data.success) {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("Error while updating the user");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        View User
      </Typography>
      <Stack spacing={3} component={Paper} sx={{ p: 3 }}>
        <TextField
          label="Enter User ID"
          variant="outlined"
          fullWidth
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchUser}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Fetch User Data"}
        </Button>
        {userData && (
          <>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={userData.NAME}
              onChange={(e) => handleChange("NAME", e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={userData.ROLE}
                label="Role"
                onChange={(e) => handleChange("ROLE", e.target.value)}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Instructor</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              value={userData.CONTACT_NUMBER || ""}
              onChange={(e) => handleChange("CONTACT_NUMBER", e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={userData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              value={userData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUpdateUser}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Update User Data"}
            </Button>
          </>
        )}
      </Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ModifyUser;
