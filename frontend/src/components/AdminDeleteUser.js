import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DeleteUser = () => {
  const [userToDelete, setUserToDelete] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) {
      setSnackbarMessage("No user id to delete.");
      setOpenDialog(false);
    }
    let msg = "";
    try {
      const response = await axios.delete(
        `http://localhost:3001/iiitn/adminDeleteUser/${userToDelete}`
      );
      msg = response.data.message;
      if (response.data.success) {
        setSnackbarMessage(response.data.message);
        setOpenDialog(false);
        setOpenSnackbar(true);
        setUserToDelete("");
      } else {
        setSnackbarMessage("No such user exist");
        setOpenDialog(false);
        setOpenSnackbar(true);
        setUserToDelete("");
      }
    } catch (error) {
      setSnackbarMessage(msg);
      setOpenDialog(false);
      setOpenSnackbar(true);
      setUserToDelete("");
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Delete User
      </Typography>
      <TextField
        fullWidth
        label="User ID"
        value={userToDelete}
        onChange={(e) => setUserToDelete(e.target.value)}
        variant="outlined"
      />
      <br />
      <br />

      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        Delete User
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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

export default DeleteUser;
