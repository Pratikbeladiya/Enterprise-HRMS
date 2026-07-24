import React from "react";
import { useNavigate} from "react-router-dom";
import "./Attendance.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaCalendarCheck,
  FaUserCheck,
  FaUserTimes,
  FaClock,
} from "react-icons/fa";

function Attendance() {
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


          <li className="active">📝 Attendance</li>
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
            <h1>Attendance</h1>
            <p>Employee Attendance Management</p>
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

        {/* Attendance Summary */}

        <div className="cards">

          <div className="card">
            <FaCalendarCheck className="card-icon blue" />

            <div>
              <h2>0</h2>
              <p>Working Days</p>
            </div>
          </div>

          <div className="card">
            <FaUserCheck className="card-icon green" />

            <div>
              <h2>0</h2>
              <p>Present</p>
            </div>
          </div>

          <div className="card">
            <FaUserTimes className="card-icon orange" />

            <div>
              <h2>0</h2>
              <p>Absent</p>
            </div>
          </div>

          <div className="card">
            <FaClock className="card-icon purple" />

            <div>
              <h2>0</h2>
              <p>Leave</p>
            </div>
          </div>

        </div>

        {/* Attendance Content */}

        <div className="employee-table">

          <div className="table-header">
            <h2>Attendance Records</h2>

            <button>View All</button>

          </div>

          <table>

            <thead>

              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan="6"
                  className="no-data"
                >
                  No Attendance Data Available
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Attendance;