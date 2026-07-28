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
          navigate("/admin-attendance");
          break;

        case "payroll":
          navigate("/admin-payroll");
          break;

        case "leave":
          navigate("/admin-leave");
          break;

        case "reports":
          navigate("/admin-reports");
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
    <div className="admin-dashboard-page">

      {/* Sidebar */}

      <div className="admin-sidebar">

        <div className="admin-logo">
          <h2>HRMS</h2>
          <p>Admin Panel</p>
        </div>

        <ul className="admin-menu">

          <li className="admin-active">
            🏠 Dashboard
          </li>

          <li
            onClick={() => navigate("/admin-employees")}
            style={{ cursor: "pointer" }}
          >
            👨 Employees
          </li>

          <li
            onClick={() => navigate("/admin-attendance")}
            style={{ cursor: "pointer" }}
          >
            📝 Attendance
          </li>

          <li
            onClick={() => navigate("/admin-payroll")}
            style={{ cursor: "pointer" }}
          >
            💰 Payroll
          </li>

          <li
            onClick={() => navigate("/admin-leave")}
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
            <h1>Admin Dashboard</h1>
            <p>Human Resource Management System</p>
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

        {/* Welcome */}

        <div className="admin-welcome-card">

          <h2>Welcome, {admin.fullName} 👋</h2>

          <p>Administrator Dashboard</p>

        </div>

        {/* Summary Cards */}

        <div className="admin-dashboard-cards">

          <div className="admin-dashboard-card">
            <FaUsers className="admin-icon blue" />
            <h2>0</h2>
            <p>Total Employees</p>
          </div>

          <div className="admin-dashboard-card">
            <FaUserCheck className="admin-icon green" />
            <h2>0</h2>
            <p>Present Today</p>
          </div>

          <div className="admin-dashboard-card">
            <FaUserTimes className="admin-icon red" />
            <h2>0</h2>
            <p>Absent Today</p>
          </div>

          <div className="admin-dashboard-card">
            <FaCalendarAlt className="admin-icon orange" />
            <h2>0</h2>
            <p>Pending Leaves</p>
          </div>

          <div className="admin-dashboard-card">
            <FaMoneyBillWave className="admin-icon purple" />
            <h2>₹0</h2>
            <p>Total Payroll</p>
          </div>

        </div>

        {/* Tables */}

        <div className="admin-dashboard-grid">

          <div className="admin-dashboard-box">

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

                  <td
                    colSpan="4"
                    className="admin-no-data"
                  >
                    No Employee Records Available
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          <div className="admin-dashboard-box">

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

                  <td
                    colSpan="4"
                    className="admin-no-data"
                  >
                    No Leave Requests Available
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* Recent Activities */}

        <div className="admin-profile-box">

          <h3>Recent Activities</h3>

          <div className="admin-profile-grid">

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