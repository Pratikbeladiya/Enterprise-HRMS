import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminReports.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaFilter,
} from "react-icons/fa";

function AdminReports() {

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

    <div className="admin-report-page">

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

          <li
            onClick={() => navigate("/admin-leave")}
            style={{ cursor: "pointer" }}
          >
            📅 Leave
          </li>

          <li className="admin-active">
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

            <h1>Reports Management</h1>

            <p>Send Reports to Employees</p>

          </div>

          <div className="admin-top-right">

            <div className="admin-search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
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
            Manage Employee Reports
          </p>

        </div>

        {/* Summary Cards */}

        <div className="admin-report-cards">

          <div className="admin-report-card">

            <FaFileAlt className="admin-report-icon blue" />

            <h2>0</h2>

            <p>Total Reports</p>

          </div>

          <div className="admin-report-card">

            <FaCheckCircle className="admin-report-icon green" />

            <h2>0</h2>

            <p>Delivered</p>

          </div>

          <div className="admin-report-card">

            <FaClock className="admin-report-icon orange" />

            <h2>0</h2>

            <p>Pending</p>

          </div>

          <div className="admin-report-card">

            <FaEye className="admin-report-icon purple" />

            <h2>0</h2>

            <p>Viewed</p>

          </div>

        </div>

        {/* Filter Section */}

        <div className="admin-report-filter">

          <h2>
            <FaFilter /> Report Filters
          </h2>

          <div className="admin-report-filter-grid">

            <div className="admin-report-group">
              <label>From Date</label>
              <input type="date" />
            </div>

            <div className="admin-report-group">
              <label>To Date</label>
              <input type="date" />
            </div>

            <div className="admin-report-group">
              <label>Employee</label>
              <select>
                <option>Select Employee</option>
              </select>
            </div>

            <div className="admin-report-group">
              <label>Status</label>
              <select>
                <option>All</option>
                <option>Sent</option>
                <option>Viewed</option>
              </select>
            </div>

          </div>

        </div>

        {/* Send Report */}

        <div className="admin-report-form">

          <h2>Send Report</h2>

          <div className="admin-report-form-grid">

            <div className="admin-report-group">

              <label>Employee Name</label>

              <select>

                <option>Select Employee</option>

              </select>

            </div>

            <div className="admin-report-group">

              <label>Report Title</label>

              <input
                type="text"
                placeholder="Enter Report Title"
              />

            </div>

            <div className="admin-report-group">

              <label>Upload PDF</label>

              <input type="file" />

            </div>

            <div className="admin-report-group admin-report-message">

              <label>Message</label>

              <textarea
                rows="4"
                placeholder="Write report message..."
              ></textarea>

            </div>

          </div>

          <button className="admin-send-report-btn">
            Send Report
          </button>

        </div>

        {/* Reports History */}

        <div className="admin-report-table">

          <div className="admin-report-table-header">

            <h2>Sent Reports History</h2>

          </div>

          <table>

            <thead>

              <tr>

                <th>Employee</th>
                <th>Report</th>
                <th>Date</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan="4"
                  className="admin-no-data"
                >
                  No Reports Available
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default AdminReports;