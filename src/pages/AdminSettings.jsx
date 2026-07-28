import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSettings.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaUserShield,
  FaBuilding,
} from "react-icons/fa";

function AdminSettings() {

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

    <div className="admin-settings-page">

      {/* Sidebar */}

      <div className="admin-sidebar">

        <div className="admin-logo">
          <h2>HRMS</h2>
          <p>Admin Panel</p>
        </div>

        <ul className="admin-menu">

          <li onClick={() => navigate("/admin-dashboard")} style={{ cursor: "pointer" }}>
            🏠 Dashboard
          </li>

          <li onClick={() => navigate("/admin-employees")} style={{ cursor: "pointer" }}>
            👨 Employees
          </li>

          <li onClick={() => navigate("/admin-attendance")} style={{ cursor: "pointer" }}>
            📝 Attendance
          </li>

          <li onClick={() => navigate("/admin-payroll")} style={{ cursor: "pointer" }}>
            💰 Payroll
          </li>

          <li onClick={() => navigate("/admin-leave")} style={{ cursor: "pointer" }}>
            📅 Leave
          </li>

          <li onClick={() => navigate("/admin-reports")} style={{ cursor: "pointer" }}>
            📊 Reports
          </li>

          <li className="admin-active">
            <FaCog /> Settings
          </li>

          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <FaSignOutAlt /> Logout
          </li>

        </ul>

      </div>

      {/* Main */}

      <div className="admin-main">

        {/* Topbar */}

        <div className="admin-topbar">

          <div>

            <h1>Settings</h1>

            <p>Manage HRMS Configuration</p>

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

          <h2>Welcome, {admin.fullName} 👋</h2>

          <p>Manage System Settings</p>

        </div>

        {/* Profile Settings */}

        <div className="admin-settings-card">

          <h2>
            <FaUserShield /> Profile Settings
          </h2>

          <div className="admin-settings-grid">

            <div className="admin-settings-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter Full Name" />
            </div>

            <div className="admin-settings-group">
              <label>Email</label>
              <input type="email" placeholder="Enter Email" />
            </div>

            <div className="admin-settings-group">
              <label>Phone Number</label>
              <input type="text" placeholder="Enter Phone Number" />
            </div>

            <div className="admin-settings-group">
              <label>Profile Photo</label>
              <input type="file" />
            </div>

          </div>

          <button className="admin-save-btn">
            Save Changes
          </button>

        </div>

        {/* Company Settings */}

        <div className="admin-settings-card">

          <h2>
            <FaBuilding /> Company Information
          </h2>

          <div className="admin-settings-grid">

            <div className="admin-settings-group">
              <label>Company Name</label>
              <input type="text" placeholder="Company Name" />
            </div>

            <div className="admin-settings-group">
              <label>Company Email</label>
              <input type="email" placeholder="Company Email" />
            </div>

            <div className="admin-settings-group">
              <label>Company Phone</label>
              <input type="text" placeholder="Company Phone" />
            </div>

            <div className="admin-settings-group">
              <label>Company Address</label>
              <textarea rows="3" placeholder="Company Address"></textarea>
            </div>

          </div>

          <button className="admin-save-btn">
            Save Company Details
          </button>

        </div>

        {/* Security Settings */}

        <div className="admin-settings-card">

          <h2>🔒 Security Settings</h2>

          <div className="admin-settings-grid">

            <div className="admin-settings-group">
              <label>Current Password</label>
              <input
                type="password"
                placeholder="Current Password"
              />
            </div>

            <div className="admin-settings-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="New Password"
              />
            </div>

            <div className="admin-settings-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
              />
            </div>

          </div>

          <button className="admin-save-btn">
            Update Password
          </button>

        </div>

        {/* Attendance Settings */}

        <div className="admin-settings-card">

          <h2>⏰ Attendance Settings</h2>

          <div className="admin-settings-grid">

            <div className="admin-settings-group">
              <label>Office Start Time</label>
              <input type="time" />
            </div>

            <div className="admin-settings-group">
              <label>Office End Time</label>
              <input type="time" />
            </div>

            <div className="admin-settings-group">
              <label>Working Hours</label>
              <input
                type="number"
                placeholder="8"
              />
            </div>

            <div className="admin-settings-group">
              <label>Late Mark After (Minutes)</label>
              <input
                type="number"
                placeholder="15"
              />
            </div>

          </div>

          <button className="admin-save-btn">
            Save Attendance Settings
          </button>

        </div>

        {/* Notification Settings */}

        <div className="admin-settings-card">

          <h2>🔔 Notification Settings</h2>

          <div className="admin-settings-grid">

            <div className="admin-settings-group">
              <label>Email Notifications</label>
              <select>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>

            <div className="admin-settings-group">
              <label>Leave Notifications</label>
              <select>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>

            <div className="admin-settings-group">
              <label>Payroll Notifications</label>
              <select>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>

            <div className="admin-settings-group">
              <label>Report Notifications</label>
              <select>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>

          </div>

          <button className="admin-save-btn">
            Save Notification Settings
          </button>

        </div>

        {/* Data Management */}

        <div className="admin-settings-card">

          <h2>💾 Data Management</h2>

          <div className="admin-settings-grid">

            <button className="admin-action-btn">
              Export Employees
            </button>

            <button className="admin-action-btn">
              Export Attendance
            </button>

            <button className="admin-action-btn">
              Export Payroll
            </button>

            <button className="admin-action-btn">
              Export Reports
            </button>

            <button className="admin-action-btn">
              Backup Database
            </button>

            <button className="admin-action-btn danger">
              Restore Backup
            </button>

          </div>

        </div>

        {/* System Preferences */}

        <div className="admin-settings-card">

          <h2>⚙️ System Preferences</h2>

          <div className="admin-settings-grid">

            <div className="admin-settings-group">

              <label>Theme</label>

              <select>
                <option>Light</option>
                <option>Dark</option>
              </select>

            </div>

            <div className="admin-settings-group">

              <label>Language</label>

              <select>
                <option>English</option>
                <option>Gujarati</option>
              </select>

            </div>

            <div className="admin-settings-group">

              <label>Time Zone</label>

              <select>
                <option>Asia/Kolkata</option>
              </select>

            </div>

            <div className="admin-settings-group">

              <label>Date Format</label>

              <select>
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
              </select>

            </div>

          </div>

          <button className="admin-save-btn">
            Save Preferences
          </button>

        </div>

        {/* Danger Zone */}

        <div className="admin-settings-card">

          <h2>🚨 Danger Zone</h2>

          <p className="admin-danger-text">
            Logout from all devices and remove all active sessions.
          </p>

          <button className="admin-danger-btn">
            Logout From All Devices
          </button>

        </div>

      </div>

    </div>

  );

}

export default AdminSettings;