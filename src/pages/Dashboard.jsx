import React from "react";
import {  useNavigate} from "react-router-dom";
import "./Dashboard.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaCalendarCheck,
  FaSignOutAlt,
  FaUserTimes,
  FaUmbrellaBeach,
  FaWallet,
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaIdBadge,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  
const handleLogout = () => {
  localStorage.clear();
  navigate("/login");
};

  return (
    <div className="dashboard-page">

    
      
            {/* Sidebar */}
      
            <div className="sidebar">
      
              <div className="logo">
                <h2>HRMS</h2>
                <p>Dashboard</p>
              </div>
      
              <ul className="menu">
              <li className="active">🏠 Dashboard</li>


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
    </div>
    
  );
}

export default Dashboard;