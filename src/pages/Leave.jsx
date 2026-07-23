import React from "react";
import { useNavigate } from "react-router-dom";
import "./Leave.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

function Leave() {
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
            onClick={() => navigate("/Dashboard")}
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

          <li className="active">📅 Leave</li>

         <li
  onClick={() => navigate("/reports")}
  style={{ cursor: "pointer" }}
>
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

        {/* Topbar */}

        <div className="topbar">

          <div>
            <h1>Leave</h1>
            <p>Employee Leave Management</p>
          </div>

          <div className="top-right">

            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search..."
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

        {/* Cards */}

        <div className="cards">

          <div className="card">
            <FaCalendarAlt className="card-icon blue" />
            <div>
              <h2>0</h2>
              <p>Total Leave</p>
            </div>
          </div>

          <div className="card">
            <FaCheckCircle className="card-icon green" />
            <div>
              <h2>0</h2>
              <p>Approved</p>
            </div>
          </div>

          <div className="card">
            <FaClock className="card-icon orange" />
            <div>
              <h2>0</h2>
              <p>Pending</p>
            </div>
          </div>

          <div className="card">
            <FaTimesCircle className="card-icon red" />
            <div>
              <h2>0</h2>
              <p>Rejected</p>
            </div>
          </div>

        </div>

<div className="leave-form">

  <h2>Apply Leave</h2>

  <div className="form-row">

    <div className="form-group">
      <label>Leave Type</label>
      <select>
        <option>Select Leave Type</option>
        <option>Casual Leave</option>
        <option>Sick Leave</option>
        <option>Paid Leave</option>
      </select>
    </div>

    <div className="form-group">
      <label>From Date</label>
      <input type="date" />
    </div>

    <div className="form-group">
      <label>To Date</label>
      <input type="date" />
    </div>

  </div>

  <div className="form-group">
    <label>Reason</label>
    <textarea
      rows="4"
      placeholder="Enter reason for leave"
    ></textarea>
  </div>

  <button className="apply-btn">
    Apply Leave
  </button>

</div>

        {/* Leave Table */}

        <div className="employee-table">

          <div className="table-header">
            <h2>Leave Requests</h2>

            
          </div>

          <table>

            <thead>

              <tr>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan="5"
                  className="no-data"
                >
                  No Leave Requests Available
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Leave;