// Dashboard.js
import React, { useState, useEffect } from "react";
import "./StudentDashboardPage.css";
import axios from "axios";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateDetails from "./UpdatePersonalDetails";
import Performance from "./PerformancePage";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const [isLoggedIn, setIsLoggedIn] = useState("true");
  const [activeComponent, setActiveComponent] = useState({ name: "Welcome" });

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
    if (!loggedInStatus) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  const loadComponent = (component) => {
    setActiveComponent({ name: component, data });
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar Section */}
      <Box className="sidebar">
        <AppBar position="static" sx={{ backgroundColor: "#0096FF" }}>
          <Toolbar>
            <SchoolIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Student Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box className="sidebar-options">
          <Button onClick={() => loadComponent("UpdateDetails")}>
            Update Details
          </Button>
          <Button onClick={() => loadComponent("Performance")}>
            See Performance
          </Button>
          <Button onClick={() => loadComponent("SeeExamSchedule")}>
            See Exam Schedule
          </Button>
        </Box>
        {/* Logout Button */}
        <Box sx={{ mt: "auto", p: 2 }}>
          <Button variant="contained" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      <Box className="main-content">
        <AppBar position="sticky" sx={{ backgroundColor: "#0096FF" }}>
          <Toolbar>
            <SchoolIcon sx={{ mr: 2 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Welcome, {data?.NAME || "Teacher"}
            </Typography>
          </Toolbar>
        </AppBar>
        {activeComponent.name === "UpdateDetails" && (
          <UpdateDetails data={data} />
        )}
        {activeComponent.name === "Performance" && (
          <Performance data={activeComponent.data} />
        )}
        {activeComponent.name === "SeeExamSchedule" && (
          <iframe
            title="Exam Schedule"
            src="https://docs.google.com/spreadsheets/d/1z5qPloAoPbPF1NIUJrEXW39HAZ6ITtTHIadYmUamzIM/edit?usp=sharing"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          ></iframe>
        )}
        {activeComponent.name === "Welcome" && (
          <Typography variant="h6" sx={{ mt: 4 }}>
            Select an option from the menu to view details.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
