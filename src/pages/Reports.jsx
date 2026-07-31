import React from "react";
import { useNavigate } from "react-router-dom";
import "./Reports.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEye,
  FaDownload,
} from "react-icons/fa";

function Reports() {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.clear();
  navigate("/login");
};

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
            onClick={() => navigate("/dashboard")}
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

          <li
            onClick={() => navigate("/attendance")}
            style={{ cursor: "pointer" }}
          >
            📝 Attendance
          </li>

         
          <li
            onClick={() => navigate("/leave")}
            style={{ cursor: "pointer" }}
          >
            📅 Leave
          </li>

           <li
            onClick={() => navigate("/payroll")}
            style={{ cursor: "pointer" }}
          >
            💰 Payroll
          </li>


          <li className="active">
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
            <h1>Reports</h1>
            <p>View and Analyze Employee Reports</p>
          </div>

          <div className="top-right">

            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search Reports..."
              />
            </div>

            <FaBell className="bell" />

            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="profile"
            />

          </div>

        </div>

        {/* Summary Cards */}

        <div className="cards">

          <div className="card">
            <FaFileAlt className="card-icon blue" />
            <div>
              <h3>0</h3>
              <p>Total Reports</p>
            </div>
          </div>

          <div className="card">
            <FaCheckCircle className="card-icon green" />
            <div>
              <h3>0</h3>
              <p>Completed</p>
            </div>
          </div>

          <div className="card">
            <FaClock className="card-icon orange" />
            <div>
              <h3>0</h3>
              <p>In Progress</p>
            </div>
          </div>

          <div className="card">
            <FaTimesCircle className="card-icon red" />
            <div>
              <h3>0</h3>
              <p>Overdue</p>
            </div>
          </div>

        </div>

        {/* Filter Section */}

        <div className="filter-box">

          <div className="filter-group">
            <label>Report Type</label>
            <select>
              <option>All Reports</option>
              <option>Daily Report</option>
              <option>Weekly Report</option>
              <option>Monthly Report</option>
            </select>
          </div>

          <div className="filter-group">
            <label>From Date</label>
            <input type="date" />
          </div>

          <div className="filter-group">
            <label>To Date</label>
            <input type="date" />
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select>
              <option>All</option>
              <option>Completed</option>
              <option>In Progress</option>
              <option>Overdue</option>
            </select>
          </div>

          <div className="filter-btn-box">
            <button className="filter-btn">
              Apply Filters
            </button>
          </div>

        </div>

        {/* Reports Table */}

        <div className="report-box">

          <div className="table-header">

            <h2>My Reports</h2>

            <button className="download-btn">
              <FaDownload /> Export Report
            </button>

          </div>

          <table>

            <thead>

              <tr>
                <th>Report ID</th>
                <th>Report Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan="6"
                  className="no-data"
                >
                  No Report Available
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Reports;