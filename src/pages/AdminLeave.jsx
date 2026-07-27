import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLeave.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaFilter,
} from "react-icons/fa";

function AdminLeave() {

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
          navigate("/admin-employees");
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
          navigate("/admin-settings");
          break;

        default:
          alert("No Page Found");

      }

    }

  };

  return (

    <div className="admin-leave-page">

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

          <li className="admin-active">
            📅 Leave
          </li>

          <li
            onClick={() => navigate("/admin-reports")}
            style={{ cursor: "pointer" }}
          >
            📊 Reports
          </li>

          <li
            onClick={() => navigate("/admin-settings")}
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

            <h1>Leave Management</h1>

            <p>Manage Employee Leave Requests</p>

          </div>

          <div className="admin-top-right">

            <div className="admin-search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
              />

            </div>

            <FaBell className="admin-bell" />

            <img
              src="https://i.pravatar.cc/150?img=15"
              alt="Admin"
              className="admin-profile"
            />

          </div>

        </div>

        {/* Welcome */}

        <div className="admin-welcome-card">

          <h2>
            Welcome, {admin.fullName} 👋
          </h2>

          <p>
            Manage employee leave requests efficiently.
          </p>

        </div>

        {/* Summary Cards */}

        <div className="admin-leave-cards">

          <div className="admin-leave-card">

            <FaCalendarAlt className="admin-leave-icon blue" />

            <h2>0</h2>

            <p>Total Requests</p>

          </div>

          <div className="admin-leave-card">

            <FaCheckCircle className="admin-leave-icon green" />

            <h2>0</h2>

            <p>Approved</p>

          </div>

          <div className="admin-leave-card">

            <FaClock className="admin-leave-icon orange" />

            <h2>0</h2>

            <p>Pending</p>

          </div>

          <div className="admin-leave-card">

            <FaTimesCircle className="admin-leave-icon red" />

            <h2>0</h2>

            <p>Rejected</p>

          </div>

        </div>

        {/* Filter Section */}

        <div className="admin-leave-filter">

          <h2>
            <FaFilter /> Filter Leave Requests
          </h2>

          <div className="admin-leave-filter-grid">

            <div className="admin-leave-group">
              <label>From Date</label>
              <input type="date" />
            </div>

            <div className="admin-leave-group">
              <label>To Date</label>
              <input type="date" />
            </div>

            <div className="admin-leave-group">
              <label>Leave Type</label>
              <select>
                <option>All</option>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Paid Leave</option>
              </select>
            </div>

            <div className="admin-leave-group">
              <label>Status</label>
              <select>
                <option>All</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>

          </div>

        </div>

        {/* Leave Requests */}

        <div className="admin-leave-table">

          <div className="admin-leave-table-header">

            <h2>Employee Leave Requests</h2>

          </div>

          <table>

            <thead>

              <tr>

                <th>Employee</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Total Days</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan="6"
                  className="admin-no-data"
                >
                  No Leave Requests Available
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* Leave Details */}

        <div className="admin-leave-details">

          <h2>Leave Details</h2>

          <div className="admin-leave-info">

            <p><strong>Employee :</strong> -</p>

            <p><strong>Department :</strong> -</p>

            <p><strong>Leave Type :</strong> -</p>

            <p><strong>From :</strong> -</p>

            <p><strong>To :</strong> -</p>

            <p><strong>Total Days :</strong> 0</p>

            <p><strong>Reason :</strong> No Request Selected</p>

          </div>

          <div className="admin-leave-buttons">

            <button className="admin-approve-btn">
              Approve
            </button>

            <button className="admin-reject-btn">
              Reject
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminLeave;