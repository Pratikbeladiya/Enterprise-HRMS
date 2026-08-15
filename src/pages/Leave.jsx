import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Leave.css";

import {
  FaBell,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

function Leave() {
  const navigate = useNavigate();

  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const [leaveRequests, setLeaveRequests] = useState([]);

  const [message, setMessage] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Calculate number of leave days
  const calculateDays = (from, to) => {
    const start = new Date(from);
    const end = new Date(to);

    const difference = end - start;

    return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();

    setMessage("");

    // Validation
    if (!leaveType || !fromDate || !toDate || !reason.trim()) {
      setMessage("Please fill all leave details.");
      return;
    }

    if (new Date(toDate) < new Date(fromDate)) {
      setMessage("To Date cannot be earlier than From Date.");
      return;
    }

    const days = calculateDays(fromDate, toDate);

    const newLeave = {
      id: Date.now(),
      leaveType,
      fromDate,
      toDate,
      days,
      reason,
      status: "Pending",
    };

    setLeaveRequests((prev) => [...prev, newLeave]);

    // Reset form
    setLeaveType("");
    setFromDate("");
    setToDate("");
    setReason("");

    setMessage("Leave request submitted successfully!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // Leave statistics
  const totalLeave = leaveRequests.length;

  const approvedLeave = leaveRequests.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const pendingLeave = leaveRequests.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const rejectedLeave = leaveRequests.filter(
    (leave) => leave.status === "Rejected"
  ).length;

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

          <li className="active">
            📅 Leave
          </li>

          <li
            onClick={() => navigate("/reports")}
            style={{ cursor: "pointer" }}
          >
            📊 Reports
          </li>

          <li
            onClick={() => navigate("/payroll")}
            style={{ cursor: "pointer" }}
          >
            💰 Payroll
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
            <h1>Leave</h1>
            <p>Employee Leave Management</p>
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

        {/* Leave Statistics */}

        <div className="cards">

          <div className="card">
            <FaCalendarAlt className="card-icon blue" />

            <div>
              <h2>{totalLeave}</h2>
              <p>Total Leave</p>
            </div>
          </div>

          <div className="card">
            <FaCheckCircle className="card-icon green" />

            <div>
              <h2>{approvedLeave}</h2>
              <p>Approved</p>
            </div>
          </div>

          <div className="card">
            <FaClock className="card-icon orange" />

            <div>
              <h2>{pendingLeave}</h2>
              <p>Pending</p>
            </div>
          </div>

          <div className="card">
            <FaTimesCircle className="card-icon red" />

            <div>
              <h2>{rejectedLeave}</h2>
              <p>Rejected</p>
            </div>
          </div>

        </div>

        {/* Apply Leave */}

        <div className="leave-form">

          <div className="form-title">
            <div>
              <h2>Apply Leave</h2>
              <p>Submit a new leave request</p>
            </div>
          </div>

          {message && (
            <div
              className={
                message.includes("successfully")
                  ? "leave-message success"
                  : "leave-message error"
              }
            >
              {message}
            </div>
          )}

          <form onSubmit={handleApplyLeave}>

            <div className="form-row">

              <div className="form-group">
                <label>Leave Type</label>

                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option value="">
                    Select Leave Type
                  </option>

                  <option value="Casual Leave">
                    Casual Leave
                  </option>

                  <option value="Sick Leave">
                    Sick Leave
                  </option>

                  <option value="Paid Leave">
                    Paid Leave
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>From Date</label>

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>To Date</label>

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

            </div>

            <div className="form-group">

              <label>Reason</label>

              <textarea
                rows="4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for leave"
              />

            </div>

            <button
              type="submit"
              className="apply-btn"
            >
              Apply Leave
            </button>

          </form>

        </div>

        {/* Leave Requests */}

        <div className="employee-table">

          <div className="table-header">
            <div>
              <h2>Leave Requests</h2>
              <p>View your submitted leave requests</p>
            </div>
          </div>

          <table>

            <thead>
              <tr>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {leaveRequests.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="no-data"
                  >
                    No Leave Requests Available
                  </td>
                </tr>

              ) : (

                leaveRequests.map((leave) => (

                  <tr key={leave.id}>

                    <td>{leave.leaveType}</td>

                    <td>{leave.fromDate}</td>

                    <td>{leave.toDate}</td>

                    <td>{leave.days}</td>

                    <td>
                      <span className="status pending">
                        {leave.status}
                      </span>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Leave;
