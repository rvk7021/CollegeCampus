// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isLoggedIn) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (userRole !== requiredRole) {
    // If user role doesn't match required role, redirect to home or dashboard
    window.alert("You have not that right\nYou are redirected to login page");
    return <Navigate to="/login" replace />;
  }

  return element; // Render the component if everything matches
};

export default ProtectedRoute;
