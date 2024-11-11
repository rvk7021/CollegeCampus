import React, { useState } from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const CustomContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f2f5",
  padding: "2rem",
});

const FormBox = styled(Box)({
  padding: "2rem",
  backgroundColor: "white",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  maxWidth: "500px",
  width: "100%",
});

const UpdateButton = styled(Button)({
  marginTop: "1.5rem",
  backgroundColor: "#007bff",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#45A049",
  },
});

const UpdateForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  const [contactNumber, setContactNumber] = useState("");
  const [newpassword, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdate = async () => {
    try {
      if (!contactNumber && !newpassword) {
        alert("Please fill in at least one field to update.");
        return;
      }

      if (contactNumber) {
        data.CONTACT_NUMBER = contactNumber;
      }
      if (newpassword) {
        data.newPassword = newpassword;
      }

      console.log("Update page: ", data);
      const response = await axios.patch(
        "http://localhost:3001/iiitn/updateDetails",
        data
      );
      if (response.data.success) {
        if (data.newPassword) data.password = data.newPassword;
        alert("Your details have been updated successfully!");
        setSuccessMessage("Your details have been updated successfully!");
      }
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  return (
    <CustomContainer>
      <FormBox>
        <Typography variant="h4" align="center" gutterBottom>
          Update Your Details
        </Typography>
        <TextField
          fullWidth
          label="New Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="New Password"
          value={newpassword}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          variant="outlined"
          required
          type="password"
        />
        <UpdateButton
          variant="contained"
          size="large"
          fullWidth
          onClick={handleUpdate}
        >
          Update Details
        </UpdateButton>
        {successMessage && (
          <Typography
            variant="body1"
            align="center"
            color="green"
            style={{ marginTop: "1rem" }}
          >
            {successMessage}
          </Typography>
        )}
      </FormBox>
    </CustomContainer>
  );
};

export default UpdateForm;
