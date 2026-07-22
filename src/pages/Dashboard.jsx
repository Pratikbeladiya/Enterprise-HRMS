import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import {
  FaUsers,
  FaUserCheck,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>HRMS</h2>
          <p>Dashboard</p>
        </div>

        <ul className="menu">
          <li
            className="active"
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          >
            🏠 Dashboard
          </li>

          <li style={{ cursor: "pointer" }}>
            👨 Employees
          </li>

          <li
            onClick={() => navigate("/attendance")}
            style={{ cursor: "pointer" }}
          >
            📝 Attendance
          </li>

          <li style={{ cursor: "pointer" }}>
            💰 Payroll
          </li>

          <li style={{ cursor: "pointer" }}>
            📅 Leave
          </li>

          <li style={{ cursor: "pointer" }}>
            📊 Reports
          </li>

          <li style={{ cursor: "pointer" }}>
            <FaCog /> Settings
          </li>

          <li style={{ cursor: "pointer" }}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </div>

      {/* Main */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to Human Resource Management System</p>
          </div>

          <div className="top-right">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Search..." />
            </div>

            <FaBell className="bell" />

            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="profile"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card">
            <FaUsers className="card-icon blue" />
            <div>
              <h2>0</h2>
              <p>Total Employees</p>
            </div>
          </div>

          <div className="card">
            <FaUserCheck className="card-icon green" />
            <div>
              <h2>0</h2>
              <p>Present Today</p>
            </div>
          </div>

          <div className="card">
            <FaCalendarAlt className="card-icon orange" />
            <div>
              <h2>0</h2>
              <p>Leave Requests</p>
            </div>
          </div>

          <div className="card">
            <FaMoneyBillWave className="card-icon purple" />
            <div>
              <h2>₹0</h2>
              <p>Monthly Payroll</p>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="overview">
            <h2>Employee Overview</h2>

            <div className="chart-box">
              <div className="empty-chart">
                <h3>0</h3>
                <p>No employee records available</p>
              </div>
            </div>
          </div>

          <div className="summary">
            <h2>Quick Summary</h2>

            <div className="summary-card">
              <span>Active Employees</span>
              <h3>0</h3>
            </div>

            <div className="summary-card">
              <span>On Leave</span>
              <h3>0</h3>
            </div>

            <div className="summary-card">
              <span>Absent Today</span>
              <h3>0</h3>
            </div>

            <div className="summary-card">
              <span>Pending Requests</span>
              <h3>0</h3>
            </div>
          </div>
        </div>

        {/* Recent Employees */}
        <div className="employee-table">
          <div className="table-header">
            <h2>Recent Employees</h2>
            <button>View All</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="4" className="no-data">
                  No Employee Data Available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;