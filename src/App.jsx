import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";

// User Pages
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import Leave from "./pages/Leave";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminAttendance from "./pages/AdminAttendance";
import AdminEmployees from "./pages/AdminEmployees";
import AdminPayroll from "./pages/AdminPayroll";
import AdminLeave from "./pages/AdminLeave";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Signup />} />

        {/* User Authentication */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Authentication */}
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* User Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />

        {/* Admin Pages */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-attendance" element={<AdminAttendance />}/>
        <Route path="/admin-employees" element={<AdminEmployees />}/>
        <Route path="/admin-payroll" element={<AdminPayroll />}/>
        <Route path="/admin-leave"element={<AdminLeave />}/>
        <Route path="/admin-reports" element={<AdminReports />}/>
        <Route path="/admin-settings" element={<AdminSettings />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;