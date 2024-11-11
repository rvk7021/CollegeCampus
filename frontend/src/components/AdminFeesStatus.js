import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Avatar,
  Stack,
  IconButton,
  LinearProgress,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import NotPaidIcon from "@mui/icons-material/HighlightOff";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RefreshIcon from "@mui/icons-material/Refresh";

const FeeStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  const [paidCount, setPaidCount] = useState(null);
  const [notPaidCount, setNotPaidCount] = useState(null);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchFeeStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/iiitn/adminFeesStatus"
      );
      setPaidCount(response.data.data[0]);
      setNotPaidCount(response.data.data[1]);

      setLastUpdated(new Date().toLocaleTimeString()); // Update the timestamp
    } catch (err) {
      setError("Failed to fetch data");
      setOpenSnackbar(true);
    }
  };

  const handleNavigate = (path) => {
    navigate(path, { state: { data: data } });
  };

  useEffect(() => {
    fetchFeeStatus();
  }, []);

  const totalStudents =
    paidCount !== null && notPaidCount !== null
      ? paidCount + notPaidCount
      : null;
  const paidPercentage = totalStudents
    ? ((paidCount / totalStudents) * 100).toFixed(1)
    : null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 4,
        backgroundColor: "#f0f2f5",
      }}
    >
      {/* Page Header */}
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", marginBottom: 2 }}
      >
        Student Fee Status
      </Typography>

      {/* Last Updated and Refresh Button */}
      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <Typography variant="body2" color="textSecondary">
          Last updated: {lastUpdated || "Loading..."}
        </Typography>
        <IconButton
          onClick={fetchFeeStatus}
          color="primary"
          aria-label="refresh"
        >
          <RefreshIcon />
        </IconButton>
      </Stack>

      {/* Summary Section */}
      <Stack direction="row" spacing={4} justifyContent="center" mb={4}>
        <Box textAlign="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}>
              <AccountBalanceIcon fontSize="large" />
            </Avatar>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1">Total Students : </Typography>
            <Typography variant="h6" color="#1976d2">
              {totalStudents ?? <CircularProgress size={24} />}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavigate("/StudentFees")}
            sx={{ marginTop: 4 }}
          >
            Update Fees Details
          </Button>
        </Box>
      </Stack>

      {/* Payment Progress */}
      {paidPercentage && (
        <Box width="60%" mb={4}>
          <Typography variant="body1" gutterBottom>
            Payment Completion: {paidPercentage}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={parseFloat(paidPercentage)}
          />
        </Box>
      )}

      {/* Cards Section */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#e8f5e9", color: "#388e3c" }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Fees Paid
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Number of students who have paid their fees.
              </Typography>
              <Typography variant="h4" mt={2}>
                {paidCount !== null ? paidCount : <CircularProgress />}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#ffebee", color: "#d32f2f" }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Fees Not Paid
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Number of students who have not paid their fees yet.
              </Typography>
              <Typography variant="h4" mt={2}>
                {notPaidCount !== null ? notPaidCount : <CircularProgress />}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Error Snackbar */}
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

export default FeeStatus;
