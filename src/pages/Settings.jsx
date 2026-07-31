import React, { useState, useEffect } from "react";
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

  // Theme

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Profile

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] =
    useState("");

  // Notifications

  const [emailNotification, setEmailNotification] =
    useState(false);

  const [smsNotification, setSmsNotification] =
    useState(false);

  useEffect(() => {

    const settings = JSON.parse(
      localStorage.getItem("settings")
    );

    if (settings) {

      setFullName(settings.fullName || "");
      setEmail(settings.email || "");
      setPhone(settings.phone || "");
      setCurrentPassword(
        settings.currentPassword || ""
      );

      setTheme(settings.theme || "light");

      setEmailNotification(
        settings.emailNotification || false
      );

      setSmsNotification(
        settings.smsNotification || false
      );

      document.body.className =
        settings.theme || "light";

    }

  }, []);

  const handleSave = () => {

    const settings = {

      fullName,
      email,
      phone,
      currentPassword,
      theme,
      emailNotification,
      smsNotification,

    };

    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    localStorage.setItem(
      "theme",
      theme
    );

    document.body.className = theme;

    alert("Settings Saved Successfully!");

  };

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
            onClick={() => navigate("/Dashboard")}
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

            <h1>Settings</h1>

            <p>
              Manage Your Account Settings
            </p>

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

            {/* Full Name */}

            <div className="input-group">

              <label>
                <FaUser /> Full Name
              </label>

              <input
                type="text"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
              />

            </div>

            {/* Email */}

            <div className="input-group">

              <label>
                <FaEnvelope /> Email
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            {/* Phone */}

            <div className="input-group">

              <label>
                <FaPhone /> Phone Number
              </label>

              <input
                type="text"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

            </div>

            {/* Current Password */}

            <div className="input-group">

              <label>
                <FaLock /> Current Password
              </label>

              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
              />

            </div>

            {/* Theme */}

            <div className="input-group">

              <label>
                <FaMoon /> Theme
              </label>

              <select
                value={theme}
                onChange={(e) =>
                  setTheme(e.target.value)
                }
              >
                <option value="light">
                  Light
                </option>

                <option value="dark">
                  Dark
                </option>

              </select>

            </div>

            {/* Notifications */}

            <div className="checkbox-group">

              <label>

                <input
                  type="checkbox"
                  checked={emailNotification}
                  onChange={(e) =>
                    setEmailNotification(e.target.checked)
                  }
                />

                Email Notifications

              </label>

              <label>

                <input
                  type="checkbox"
                  checked={smsNotification}
                  onChange={(e) =>
                    setSmsNotification(e.target.checked)
                  }
                />

                SMS Notifications

              </label>

            </div>

            {/* Save Button */}

            <button
              className="save-btn"
              onClick={handleSave}
            >
              <FaSave /> Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Settings;