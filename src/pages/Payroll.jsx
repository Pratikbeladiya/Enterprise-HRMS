import React from "react";
import "./Payroll.css";

import {
  FaMoneyBillWave,
  FaWallet,
  FaMinusCircle,
  FaRupeeSign,
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Payroll() {

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

          <li onClick={() => navigate("/home")}>
            🏠 Dashboard
          </li>

          <li>
            👨 Employees
          </li>

          <li onClick={() => navigate("/attendance")}>
            📝 Attendance
          </li>

          <li
            className="active"
            onClick={() => navigate("/payroll")}
          >
            💰 Payroll
          </li>

          <li>
            📅 Leave
          </li>

          <li>
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
            <h1>Payroll</h1>
            <p>Employee Payroll Details</p>
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

        {/* Payroll Cards */}

        <div className="cards">

          <div className="card">

            <FaMoneyBillWave className="card-icon blue" />

            <div>
              <h2>₹0</h2>
              <p>Monthly Salary</p>
            </div>

          </div>

          <div className="card">

            <FaWallet className="card-icon green" />

            <div>
              <h2>₹0</h2>
              <p>Allowance</p>
            </div>

          </div>

          <div className="card">

            <FaMinusCircle className="card-icon orange" />

            <div>
              <h2>₹0</h2>
              <p>Deductions</p>
            </div>

          </div>

          <div className="card">

            <FaRupeeSign className="card-icon purple" />

            <div>
              <h2>₹0</h2>
              <p>Net Salary</p>
            </div>

          </div>

        </div>

        {/* Payroll Details */}

        <div className="employee-table">

          <div className="table-header">
            <h2>Salary Details</h2>
          </div>

          <table>

            <thead>

              <tr>
                <th>Salary Head</th>
                <th>Amount</th>
              </tr>

            </thead>

            <tbody>

              <tr>
                <td>Basic Salary</td>
                <td>₹0</td>
              </tr>

              <tr>
                <td>House Rent Allowance (HRA)</td>
                <td>₹0</td>
              </tr>

              <tr>
                <td>Medical Allowance</td>
                <td>₹0</td>
              </tr>

              <tr>
                <td>Travel Allowance</td>
                <td>₹0</td>
              </tr>

              <tr>
                <td>Bonus</td>
                <td>₹0</td>
              </tr>

              <tr>
                <td>Provident Fund (PF)</td>
                <td>₹0</td>
              </tr>

              <tr>
                <td>Professional Tax</td>
                <td>₹0</td>
              </tr>

              <tr>
                <td><b>Net Salary</b></td>
                <td><b>₹0</b></td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* Payslip History */}

        <div className="employee-table">

          <div className="table-header">
            <h2>Payslip History</h2>
          </div>

          <table>

            <thead>

              <tr>
                <th>Month</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Payslip</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan="4"
                  className="no-data"
                >
                  No Payroll Data Available
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Payroll;