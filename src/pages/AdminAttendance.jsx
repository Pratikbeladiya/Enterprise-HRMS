import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAttendance.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaCalendarAlt,
} from "react-icons/fa";

function AdminAttendance() {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

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
          navigate("/employees");
          break;

        case "attendance":
          navigate("/admin-attendance");
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
          alert("No Page Found");

      }
    }
  };

  return (

    <div className="admin-attendance-page">

      {/* Sidebar */}

      <div className="admin-sidebar">

        <div className="admin-logo">

          <h2>HRMS</h2>

          <p>Admin Panel</p>

        </div>

        <ul className="admin-menu">

          <li
            onClick={() => navigate("/admin-dashboard")}
            style={{ cursor: "pointer" }}
          >
            🏠 Dashboard
          </li>

          <li
            onClick={() => navigate("/employees")}
            style={{ cursor: "pointer" }}
          >
            👨 Employees
          </li>

          <li className="admin-active">
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

      <div className="admin-main">

        {/* Topbar */}

        <div className="admin-topbar">

          <div>

            <h1>Attendance</h1>

            <p>Admin Attendance Management</p>

          </div>

          <div className="admin-top-right">

            <div className="admin-search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search Page..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
              />

            </div>

            <FaBell className="admin-bell" />

            <img
              src="https://i.pravatar.cc/150?img=15"
              alt="profile"
              className="admin-profile"
            />

          </div>

        </div>

        {/* Summary Cards */}

        <div className="admin-attendance-cards">

          <div className="admin-attendance-card">

            <FaUsers className="admin-card-icon blue" />

            <h2>0</h2>

            <p>Total Employees</p>

          </div>

          <div className="admin-attendance-card">

            <FaUserCheck className="admin-card-icon green" />

            <h2>0</h2>

            <p>Present Today</p>

          </div>

          <div className="admin-attendance-card">

            <FaUserTimes className="admin-card-icon red" />

            <h2>0</h2>

            <p>Absent Today</p>

          </div>

          <div className="admin-attendance-card">

            <FaCalendarAlt className="admin-card-icon orange" />

            <h2>0</h2>

            <p>Leave Today</p>

          </div>

        </div>

        {/* Attendance Table */}

        <div className="admin-attendance-table">

          <div className="admin-attendance-header">

            <h2>Today's Attendance</h2>

            <div className="admin-attendance-date">

              <label>Date</label>

              <input type="date" />

            </div>

          </div>

          <table>

            <thead>

              <tr>

                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan="6"
                  className="admin-no-data"
                >
                  No Employee Records Available
                </td>

              </tr>

            </tbody>

          </table>

          <div className="admin-attendance-btn">

            <button
              className="admin-save-btn"
              onClick={() =>
                alert("Attendance Saved Successfully!")
              }
            >
              Save Today's Attendance
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AdminAttendance;