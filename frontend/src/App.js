import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "./components/LoginPage";
import NotFoundPage from "./components/PageNotFound404";
import UpdateForm from "./components/UpdatePersonalDetails";
import UpdateProfile from "./components/UpdateProfile";
import PerformancePage from "./components/PerformancePage";
import StudentDashboard from "./components/StudentDashboardPage";
import TeacherDashboard from "./components/TeacherDashBoard";
import AdminDashboard from "./components/AdminDashBoard";
import TeacherCourses from "./components/TeacherCourses";
import CRUDonStudent from "./components/CRUDonStudent";
import AddStudentForm from "./components/AddStudent";
import AdminUser from "./components/AdminUser";
import AdminCourse from "./components/AdminCourse";
import StudentPerformance from "./components/StudentPerformancePage";
import UpdateStudentMarks from "./components/UpdateStudentMarks";
import StudentFees from "./components/StudentFees";
import Home from "./pages/home";
import ContactUs from "./pages/contactus";
import AboutUs from "./pages/aboutus";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/updateDetails" element={<UpdateForm />} />
        <Route path="/changeStudent" element={<CRUDonStudent />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/addStudent" element={<AddStudentForm />} />
        <Route path="/ManageUser" element={<AdminUser />} />
        <Route path="/ManageCourse" element={<AdminCourse />} />
        <Route path="/profile" element={<UpdateProfile />} />
        <Route path="/StudentPerformance" element={<StudentPerformance />} />
        <Route path="/UpdateMarks" element={<UpdateStudentMarks />} />
        <Route path="/StudentFees" element={<StudentFees />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Role-protected routes */}
        <Route
          path="/sdashboard"
          element={
            <ProtectedRoute
              element={<StudentDashboard />}
              requiredRole="student"
            />
          }
        />
        <Route
          path="/tdashboard"
          element={
            <ProtectedRoute
              element={<TeacherDashboard />}
              requiredRole="teacher"
            />
          }
        />
        <Route
          path="/adashboard"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              requiredRole="super_admin"
            />
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute
              element={<TeacherCourses />}
              requiredRole="teacher"
            />
          }
        />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
