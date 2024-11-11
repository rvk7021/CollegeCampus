import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  Divider,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import GradeIcon from "@mui/icons-material/Grade";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";

// Import your component pages here
import Courses from "./TeacherCourses";
import StudentPerformance from "./StudentPerformancePage";
import UpdateMarks from "./UpdateStudentMarks";
import Profile from "./UpdateProfile";

const drawerWidth = 240;

const TeacherDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showExamSchedule, setShowExamSchedule] = useState(false); // State for exam schedule iframe

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole") === "teacher";

    if (!loggedInStatus || !userRole) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  const handleSelectComponent = async (component, endpoint = null) => {
    if (endpoint) {
      const response = await axios.post(
        `http://localhost:3001/iiitn/${endpoint}`,
        data
      );
      setSelectedComponent({ component, data: response.data });
    } else {
      setSelectedComponent({ component, data: data });
    }
    setShowExamSchedule(false); // Reset the exam schedule view
  };

  const handleShowExamSchedule = () => {
    setShowExamSchedule(true);
    setSelectedComponent(null); // Reset the selected component
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent?.component) {
      case "courses":
        return <Courses data={selectedComponent.data} />;
      case "studentPerformance":
        return <StudentPerformance data={selectedComponent.data} />;
      case "updateMarks":
        return <UpdateMarks data={selectedComponent.data} />;
      case "profile":
        return <Profile data={selectedComponent.data} />;
      default:
        return (
          <Typography variant="h6" sx={{ mt: 4 }}>
            Select an option from the menu to view details.
          </Typography>
        );
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <CssBaseline />

      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <Avatar
            alt="Teacher Avatar"
            src="/static/images/avatar/1.jpg" // Ensure this is unique
            sx={{ marginRight: 2 }}
          />
          <Typography variant="h6">Teacher Dashboard</Typography>
        </Toolbar>
        <List>
          <ListItem
            button
            onClick={() => handleSelectComponent("courses", "course")}
          >
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Your Courses" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleSelectComponent("studentPerformance")}
          >
            <ListItemIcon>
              <GradeIcon />
            </ListItemIcon>
            <ListItemText primary="Student Performance" />
          </ListItem>
          <ListItem button onClick={() => handleSelectComponent("updateMarks")}>
            <ListItemIcon>
              <GradeIcon />
            </ListItemIcon>
            <ListItemText primary="Submit Grades" />
          </ListItem>
          <ListItem button onClick={() => handleSelectComponent("profile")}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Your Profile" />
          </ListItem>
          <ListItem button onClick={handleShowExamSchedule}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Exam TimeTable" />
          </ListItem>
        </List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <AppBar position="sticky" sx={{ backgroundColor: "#3f51b5" }}>
          <Toolbar>
            <SchoolIcon sx={{ mr: 2 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Welcome, {data?.NAME || "Teacher"}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ mt: 4 }}>
          {showExamSchedule ? (
            <iframe
              title="Exam Schedule"
              src="https://docs.google.com/spreadsheets/d/1z5qPloAoPbPF1NIUJrEXW39HAZ6ITtTHIadYmUamzIM/edit?usp=sharing"
              width="100%"
              height="600" // Set a height for the iframe
              style={{ border: "none" }}
            ></iframe>
          ) : (
            renderSelectedComponent()
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherDashboard;
