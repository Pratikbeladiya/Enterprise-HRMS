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
  FaDownload,
  FaEye,
  FaCalendarAlt,
} from "react-icons/fa";

function Reports() {
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
            onClick={() => navigate("/dashboard")}
            style={{ cursor: "pointer" }}
          >
            🏠 Dashboard
          </li>

          <li>👨 Employees</li>

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

          <li className="active">
            📊 Reports
          </li>

          <li>
            <FaCog /> Settings
          </li>

          <li>
            <FaSignOutAlt /> Logout
          </li>

        </ul>

      </div>

      {/* Main */}

      <div className="main">

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
                placeholder="Search Report..."
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
              <h2>24</h2>
              <p>Total Reports</p>
            </div>
          </div>

          <div className="card">
            <FaCheckCircle className="card-icon green" />
            <div>
              <h2>18</h2>
              <p>Completed</p>
            </div>
          </div>

          <div className="card">
            <FaClock className="card-icon orange" />
            <div>
              <h2>4</h2>
              <p>Pending</p>
            </div>
          </div>

          <div className="card">
            <FaTimesCircle className="card-icon red" />
            <div>
              <h2>2</h2>
              <p>Rejected</p>
            </div>
          </div>

        </div>

        {/* Report Summary Cards */}

      <div className="cards">

        <div className="card">
          <FaCalendarAlt className="card-icon blue" />
          <div>
            <h2>0</h2>
            <p>Total Working Days</p>
          </div>
        </div>

        <div className="card">
          <FaUserCheck className="card-icon green" />
          <div>
            <h2>0</h2>
            <p>Present Days</p>
          </div>
        </div>

        <div className="card">
          <FaUserTimes className="card-icon red" />
          <div>
            <h2>0</h2>
            <p>Absent Days</p>
          </div>
        </div>

        <div className="card">
          <FaMoneyBillWave className="card-icon orange" />
          <div>
            <h2>₹0</h2>
            <p>Total Salary</p>
          </div>
        </div>

      </div>

      {/* Attendance Report */}

      <div className="report-box">

        <div className="table-header">
          <h2>Attendance Report</h2>

          <button className="download-btn">
            <FaDownload /> Download Report
          </button>
        </div>

        <table>

          <thead>
            <tr>
              <th>Month</th>
              <th>Working Days</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Leave</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td colSpan="6" className="no-data">
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

export default Report;