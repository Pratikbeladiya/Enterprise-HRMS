import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

function AdminDashboard() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    fullName: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin"));

    if (adminData) {
      setAdmin(adminData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const value = searchTerm.toLowerCase().trim();

      switch (value) {
        case "dashboard":
          navigate("/admin-dashboard");
          break;

        case "employees":
        case "employee":
          navigate("/employees");
          break;

        case "attendance":
          navigate("/attendance");
          break;

        case "payroll":
          navigate("/payroll");
          break;

        case "leave":
          navigate("/leave");
          break;

        case "reports":
          navigate("/reports");
          break;

        case "settings":
          navigate("/settings");
          break;

        default:
          alert("No page found");
      }
    }
  };

  return (
    <div className="dashboard-page">

      {/* Sidebar */}

      <div className="sidebar">

        <div className="logo">
          <h2>HRMS</h2>
          <p>Admin Panel</p>
        </div>

        <ul className="menu">

          <li className="active">
            🏠 Dashboard
          </li>

          <li
            onClick={() => navigate("/employees")}
            style={{ cursor: "pointer" }}
          >
            👨 Employees
          </li>

          <li
            onClick={() => navigate("/attendance")}
            style={{ cursor: "pointer" }}
          >
            📝 Attendance
          </li>

          <li
            onClick={() => navigate("/payroll")}
            style={{ cursor: "pointer" }}
          >
            💰 Payroll
          </li>

          <li
            onClick={() => navigate("/leave")}
            style={{ cursor: "pointer" }}
          >
            📅 Leave
          </li>

          <li
            onClick={() => navigate("/reports")}
            style={{ cursor: "pointer" }}
          >
            📊 Reports
          </li>

          <li
            onClick={() => navigate("/settings")}
            style={{ cursor: "pointer" }}
          >
            <FaCog /> Settings
          </li>

          <li
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <FaSignOutAlt /> Logout
          </li>

        </ul>

      </div>

      {/* Main */}

      <div className="main">

        {/* Topbar */}

        <div className="topbar">

          <div>
            <h1>Admin Dashboard</h1>
            <p>Human Resource Management System</p>
          </div>

          <div className="top-right">

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search Page..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
              />

            </div>

            <FaBell className="bell" />

            <img
              src="https://i.pravatar.cc/150?img=15"
              alt="profile"
              className="profile"
            />

          </div>

        </div>

        {/* Welcome */}

        <div className="welcome-card">

          <h2>
            Welcome, {admin.fullName} 👋
          </h2>

          <p>Administrator Dashboard</p>

        </div>

        {/* Summary Cards */}

        <div className="dashboard-cards">

            <div className="dashboard-card">
            <FaUsers className="icon blue" />
            <h2>0</h2>
            <p>Total Employees</p>
          </div>

          <div className="dashboard-card">
            <FaUserCheck className="icon green" />
            <h2>0</h2>
            <p>Present Today</p>
          </div>

          <div className="dashboard-card">
            <FaUserTimes className="icon red" />
            <h2>0</h2>
            <p>Absent Today</p>
          </div>

          <div className="dashboard-card">
            <FaCalendarAlt className="icon orange" />
            <h2>0</h2>
            <p>Pending Leaves</p>
          </div>

          <div className="dashboard-card">
            <FaMoneyBillWave className="icon purple" />
            <h2>₹0</h2>
            <p>Total Payroll</p>
          </div>

        </div>

        {/* Tables */}

        <div className="dashboard-grid">

          <div className="dashboard-box">

            <h3>Recent Employees</h3>

            <table>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td colSpan="4" className="no-data">
                    No Employee Records Available
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          <div className="dashboard-box">

            <h3>Pending Leave Requests</h3>

            <table>

              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td colSpan="4" className="no-data">
                    No Leave Requests Available
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="profile-box">

          <h3>Recent Activities</h3>

          <div className="profile-grid">

            <div>✅ No recent employee activity</div>

            <div>📅 No leave request found</div>

            <div>💰 No payroll updates</div>

            <div>👨 No employee added</div>

            <div>📊 Reports are up to date</div>

            <div>⚙️ System running normally</div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;
        