import React from "react";
import "./Dashboard.css";

import {
  FaCalendarCheck,
  FaUserTimes,
  FaUmbrellaBeach,
  FaWallet,
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaIdBadge,
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Welcome */}
      <div className="welcome-card">
        <h2>Welcome 👋</h2>
        <p>Employee Dashboard</p>
      </div>

      {/* Cards */}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <FaCalendarCheck className="icon green" />
          <h2>0</h2>
          <p>Present Days</p>
        </div>

        <div className="dashboard-card">
          <FaUserTimes className="icon red" />
          <h2>0</h2>
          <p>Absent Days</p>
        </div>

        <div className="dashboard-card">
          <FaUmbrellaBeach className="icon orange" />
          <h2>0</h2>
          <p>Leave Balance</p>
        </div>

        <div className="dashboard-card">
          <FaWallet className="icon blue" />
          <h2>₹0</h2>
          <p>Current Salary</p>
        </div>

      </div>

      {/* Attendance & Leave */}
      <div className="dashboard-grid">

        <div className="dashboard-box">
          <h3>My Attendance</h3>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="4" className="no-data">
                  No Attendance Records Available
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="dashboard-box">
          <h3>My Leave Requests</h3>

          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
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

      {/* Profile */}
      <div className="profile-box">

        <h3>My Profile</h3>

        <div className="profile-grid">

          <div>
            <FaUser /> <strong>Name:</strong> 0
          </div>

          <div>
            <FaIdBadge /> <strong>Employee ID:</strong> 0
          </div>

          <div>
            <FaBuilding /> <strong>Department:</strong> 0
          </div>

          <div>
            <FaEnvelope /> <strong>Email:</strong> 0
          </div>

          <div>
            <FaUser /> <strong>Designation:</strong> 0
          </div>

          <div>
            <FaUser /> <strong>Phone:</strong> 0
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;