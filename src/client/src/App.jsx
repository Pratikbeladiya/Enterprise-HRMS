import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { MainLayout } from "./components/layout/MainLayout";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Employees } from "./pages/Employees";
import { Departments } from "./pages/Departments";
import { Attendance } from "./pages/Attendance";
import { Leave } from "./pages/Leave";
import { Payroll } from "./pages/Payroll";
import { Announcements } from "./pages/Announcements";
import { Recruitment } from "./pages/Recruitment";
import { Projects } from "./pages/Projects";
import { Unauthorized } from "./pages/Unauthorized";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Enterprise Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="departments" element={<Departments />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="leave" element={<Leave />} />
              <Route path="payroll" element={<Payroll />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="recruitment" element={<Recruitment />} />
              <Route path="projects" element={<Projects />} />
              <Route path="unauthorized" element={<Unauthorized />} />
            </Route>

            {/* Fallback 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}