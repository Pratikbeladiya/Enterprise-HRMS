import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminEmployees.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaUserCheck,
  FaBuilding,
  FaPlus,
  FaDownload,
} from "react-icons/fa";

function AdminEmployees() {
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
          alert("No page found");
      }
    }
  };

  return (
    <div className="admin-employee-page">

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

          <li className="admin-active">
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
            <h1>Employees</h1>
            <p>Employee Management</p>
          </div>

          <div className="admin-top-right">

            <div className="admin-search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search Employee..."
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

          <p>Manage all employees from one place.</p>

        </div>

        {/* Summary Cards */}

        <div className="admin-employee-cards">

          <div className="admin-employee-card">
            <FaUsers className="admin-card-icon blue" />
            <h2>0</h2>
            <p>Total Employees</p>
          </div>

          <div className="admin-employee-card">
            <FaUserCheck className="admin-card-icon green" />
            <h2>0</h2>
            <p>Active Employees</p>
          </div>

          <div className="admin-employee-card">
            <FaBuilding className="admin-card-icon orange" />
            <h2>0</h2>
            <p>Departments</p>
          </div>

          <div className="admin-employee-card">
            <FaUsers className="admin-card-icon purple" />
            <h2>0</h2>
            <p>New Employees</p>
          </div>

        </div>

        {/* Employee Management */}

        <div className="admin-employee-table">

          <div className="admin-employee-table-header">

            <h2>Employee List</h2>

            <div className="admin-employee-actions">

              <button className="admin-add-btn">
                <FaPlus /> Add Employee
              </button>

              <button className="admin-export-btn">
                <FaDownload /> Export
              </button>

            </div>

          </div>

          <table>

            <thead>

              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan="7"
                  className="admin-no-data"
                >
                  No Employee Records Available
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminEmployees;