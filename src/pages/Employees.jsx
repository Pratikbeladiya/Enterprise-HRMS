import React from "react";
import { useNavigate } from "react-router-dom";
import "./Employee.css";

import {
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaCog,
  FaUsers,
  FaUserCheck,
  FaUserPlus,
  FaBuilding,
  FaFilter,
  FaDownload
} from "react-icons/fa";

function Employee() {

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
          <p>Employee Portal</p>
        </div>

        <ul className="menu">

          <li
            onClick={() => navigate("/dashboard")}
            style={{ cursor: "pointer" }}
          >
            🏠 Dashboard
          </li>

          <li className="active">
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
            💰 Payslip
          </li>

          <li
            onClick={() => navigate("/announcements")}
            style={{ cursor: "pointer" }}
          >
            📢 Announcements
          </li>

          <li
            onClick={() => navigate("/documents")}
            style={{ cursor: "pointer" }}
          >
            📁 Documents
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
            <h1>Employees</h1>
            <p>View Employees Information</p>
          </div>

          <div className="top-right">

            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search Employee..."
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
            <FaUsers className="card-icon blue" />
            <div>
              <h2>0</h2>
              <p>Total Employees</p>
            </div>
          </div>

          <div className="card">
            <FaUserCheck className="card-icon green" />
            <div>
              <h2>0</h2>
              <p>Active Employees</p>
            </div>
          </div>

          <div className="card">
            <FaUserPlus className="card-icon orange" />
            <div>
              <h2>0</h2>
              <p>New Employees</p>
            </div>
          </div>

          <div className="card">
            <FaBuilding className="card-icon purple" />
            <div>
              <h2>0</h2>
              <p>Departments</p>
            </div>
          </div>

        </div>

        {/* Employee Table */}

        <div className="employee-table">

          <div className="table-header">

            <div>
              <h2>Employee Directory</h2>
              <p>Manage all employees in your organization</p>
            </div>

            <div className="table-actions">

              <button className="filter-btn">
                <FaFilter /> Filter
              </button>

              <button className="download-btn">
                <FaDownload /> Download
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
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan="7"
                  className="empty-data"
                >

                  <div className="empty-state">

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                      alt="No Employee"
                    />

                    <h3>No Employees Found</h3>

                    <p>
                      There are no employees available right now.
                    </p>

                  </div>

                </td>

              </tr>

            </tbody>

          </table>

          <div className="pagination">

            <button disabled>Previous</button>

            <button className="active-page">
              1
            </button>

            <button disabled>Next</button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Employee;