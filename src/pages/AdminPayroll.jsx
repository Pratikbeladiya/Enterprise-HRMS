import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPayroll.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaMoneyBillWave,
  FaWallet,
  FaClock,
  FaUsers,
  FaDownload,
  FaEye,
  FaRedo,
} from "react-icons/fa";

function AdminPayroll() {

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

    <div className="admin-payroll-page">

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

          <li className="admin-active">
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

            <h1>Payroll Management</h1>

            <p>Manage Employee Salary & Payslips</p>

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

          <h2>
            Welcome, {admin.fullName} 👋
          </h2>

          <p>
            Generate and manage employee payroll.
          </p>

        </div>

        {/* Summary Cards */}

        <div className="admin-payroll-cards">

          <div className="admin-payroll-card">

            <FaMoneyBillWave className="admin-payroll-icon blue" />

            <h2>₹0</h2>

            <p>Total Payroll</p>

          </div>

          <div className="admin-payroll-card">

            <FaWallet className="admin-payroll-icon green" />

            <h2>₹0</h2>

            <p>Paid Amount</p>

          </div>

          <div className="admin-payroll-card">

            <FaClock className="admin-payroll-icon orange" />

            <h2>₹0</h2>

            <p>Pending Amount</p>

          </div>

          <div className="admin-payroll-card">

            <FaUsers className="admin-payroll-icon purple" />

            <h2>0</h2>

            <p>Total Employees</p>

          </div>

        </div>

        {/* Payroll Form */}

        <div className="admin-payroll-form">

          <div className="admin-payroll-form-header">

            <h2>Create Payroll</h2>

            <div className="admin-payroll-buttons">

              <button className="admin-preview-btn">
                <FaEye /> Preview
              </button>

              <button className="admin-reset-btn">
                <FaRedo /> Reset
              </button>

              <button className="admin-generate-btn">
                <FaDownload /> Generate Payslip
              </button>

            </div>

          </div>

          <div className="admin-payroll-grid">

            <div className="admin-payroll-group">

              <label>Employee</label>

              <select>

                <option>Select Employee</option>

              </select>

            </div>

            <div className="admin-payroll-group">

              <label>Employee ID</label>

              <input
                type="text"
                placeholder="Auto Filled"
                value=""
                readOnly
              />

            </div>

            <div className="admin-payroll-group">

              <label>Department</label>

              <input
                type="text"
                placeholder="Auto Filled"
                value=""
                readOnly
              />

            </div>

            <div className="admin-payroll-group">

              <label>Salary Month</label>

              <input type="month" />

            </div>

            <div className="admin-payroll-group">

              <label>Basic Salary</label>

              <input
                type="number"
                placeholder="₹0"
              />

            </div>

            <div className="admin-payroll-group">

              <label>Allowance</label>

              <input
                type="number"
                placeholder="₹0"
              />

            </div>

            <div className="admin-payroll-group">

              <label>Bonus</label>

              <input
                type="number"
                placeholder="₹0"
              />

            </div>

            <div className="admin-payroll-group">

              <label>Deduction</label>

              <input
                type="number"
                placeholder="₹0"
              />

            </div>

            <div className="admin-payroll-group">

              <label>Net Salary</label>

              <input
                type="text"
                value="₹0"
                readOnly
              />

            </div>

          </div>

        </div>

        {/* Generated Payslips */}

        <div className="admin-payroll-table">

          <div className="admin-payroll-table-header">

            <h2>Generated Payslips</h2>

          </div>

          <table>

            <thead>

              <tr>

                <th>Employee</th>
                <th>Month</th>
                <th>Basic Salary</th>
                <th>Net Salary</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan="5"
                  className="admin-no-data"
                >
                  No Payslip Generated
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminPayroll;