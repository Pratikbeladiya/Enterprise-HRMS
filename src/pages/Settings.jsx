import React from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMoon,
  FaSave,
} from "react-icons/fa";

function Settings() {
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

          <li className="active">
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
            <h1>Settings</h1>
            <p>Manage Your Account Settings</p>
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

        {/* Settings Card */}

        <div className="settings-container">

          <div className="settings-card">

            <h2>Profile Settings</h2>

            <div className="input-group">
              <label>
                <FaUser /> Full Name
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
              />
            </div>

            <div className="input-group">
              <label>
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
              />
            </div>

            <div className="input-group">
              <label>
                <FaPhone /> Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter Phone Number"
              />
            </div>

            <div className="input-group">
              <label>
                <FaLock /> Current Password
              </label>
              <input
                type="password"
                placeholder="Current Password"
              />
            </div>

            <div className="input-group">
              <label>
                <FaLock /> New Password
              </label>
              <input
                type="password"
                placeholder="New Password"
              />
            </div>

            <div className="input-group">
              <label>
                <FaMoon /> Theme
              </label>

              <select>
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>

            <div className="checkbox-group">

              <label>
                <input type="checkbox" />
                Email Notifications
              </label>

              <label>
                <input type="checkbox" />
                SMS Notifications
              </label>

            </div>

            <button className="save-btn">
              <FaSave /> Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;