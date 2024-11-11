import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import StudentDashboard from "./StudentDashboardPage";
import TeacherDashboard from "./TeacherDashBoard";

const LoginPage = () => {
  const [role, setRole] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleLogin = () => {
    // Handle login logic
    // Assuming login is successful, set loggedIn to true
    setLoggedIn(true);
  };

  if (loggedIn) {
    if (role === "student") {
      return <StudentDashboard />;
    } else if (role === "teacher") {
      return <TeacherDashboard />;
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Login
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>User Role</InputLabel>
          <Select
            value={role}
            onChange={handleRoleChange}
            label="User Role"
            required
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Instructor</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        {(role === "student" || role === "teacher") && (
          <TextField
            fullWidth
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            type="password"
          />
        )}
        <Grid container justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;

const handleLogin = async () => {
  try {
    const backendRequestURL = "http://localhost:3001/iiitn/login";
    const response = await axios.post(backendRequestURL, {
      email,
      password,
      role,
    });
    // console.log(response.data.data[0]);
    if (response.data.success) {
      setUserData(response.data.data[0]);
      setIsLoggedIn(true);
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
    alert("Login failed. Please check your credentials and try again.");
  }
};
