import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FaPlus,
  FaFilter,
  FaTimes,
} from "react-icons/fa";

function Attendance() {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendanceRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    date: new Date().toISOString().split("T")[0],
    checkIn: "",
    checkOut: "",
    status: "Present",
  });

  useEffect(() => {
    localStorage.setItem(
      "attendanceRecords",
      JSON.stringify(attendance)
    );
  }, [attendance]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddAttendance = (e) => {
    e.preventDefault();

    if (!formData.employeeId || !formData.employeeName || !formData.date) {
      alert("Please enter Employee ID, Employee Name and Date.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      ...formData,
    };

    setAttendance((prev) => [...prev, newRecord]);

    setFormData({
      employeeId: "",
      employeeName: "",
      date: new Date().toISOString().split("T")[0],
      checkIn: "",
      checkOut: "",
      status: "Present",
    });

    setShowModal(false);
  };

  const filteredAttendance = useMemo(() => {
    return attendance.filter((record) => {
      const matchesSearch =
        record.employeeName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        record.employeeId
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDate =
        selectedDate === "" || record.date === selectedDate;

      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;

      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [attendance, search, selectedDate, statusFilter]);

  const workingDays = new Set(
    attendance.map((item) => item.date)
  ).size;

  const presentCount = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const leaveCount = attendance.filter(
    (item) => item.status === "Leave"
  ).length;

  const clearFilters = () => {
    setSearch("");
    setSelectedDate("");
    setStatusFilter("All");
  };

  return (
    <div className="home">

      {/* Sidebar */}
      <div className="sidebar">

        <div className="logo">
          <h2>HRMS</h2>
          <p>Attendance Management</p>
        </div>

        <ul className="menu">

          <li onClick={() => navigate("/Dashboard")}>
            🏠 Dashboard
          </li>

          <li onClick={() => navigate("/employees")}>
            👨 Employees
          </li>

          <li className="active">
            📝 Attendance
          </li>

          <li onClick={() => navigate("/leave")}>
            📅 Leave
          </li>

          <li onClick={() => navigate("/reports")}>
            📊 Reports
          </li>

          <li onClick={() => navigate("/payroll")}>
            💰 Payroll
          </li>

          <li onClick={() => navigate("/settings")}>
            <FaCog /> Settings
          </li>

          <li onClick={handleLogout}>
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
            <FaCalendarCheck className="card-icon blue" />

            <div>
              <h2>{workingDays}</h2>
              <p>Working Days</p>
            </div>
          </div>

          <div className="card">
            <FaUserCheck className="card-icon green" />

            <div>
              <h2>{presentCount}</h2>
              <p>Present</p>
            </div>
          </div>

          <div className="card">
            <FaUserTimes className="card-icon orange" />

            <div>
              <h2>{absentCount}</h2>
              <p>Absent</p>
            </div>
          </div>

          <div className="card">
            <FaClock className="card-icon purple" />

            <div>
              <h2>{leaveCount}</h2>
              <p>Leave</p>
            </div>
          </div>

        </div>

        {/* Filters */}
        <div className="attendance-controls">

          <div className="filter-item">
            <FaCalendarCheck />

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="filter-item">
            <FaFilter />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
          </div>

          <button
            className="clear-filter"
            onClick={clearFilters}
          >
            <FaTimes /> Clear
          </button>

          <button
            className="mark-attendance-btn"
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Mark Attendance
          </button>

        </div>

        {/* Attendance Table */}
        <div className="employee-table">

          <div className="table-header">

            <div>
              <h2>Attendance Records</h2>
              <p>
                {filteredAttendance.length} attendance record(s)
              </p>
            </div>

          </div>

          <div className="table-wrapper">

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

                {filteredAttendance.length === 0 ? (

                  <tr>
                    <td colSpan="6" className="no-data">
                      No Attendance Data Available
                    </td>
                  </tr>

                ) : (

                  filteredAttendance.map((record) => (

                    <tr key={record.id}>

                      <td>{record.employeeId}</td>

                      <td>
                        <strong>{record.employeeName}</strong>
                      </td>

                      <td>{record.date}</td>

                      <td>{record.checkIn || "-"}</td>

                      <td>{record.checkOut || "-"}</td>

                      <td>
                        <span
                          className={`status ${record.status.toLowerCase()}`}
                        >
                          {record.status}
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

      {/* Mark Attendance Modal */}
      {showModal && (

        <div className="attendance-modal-overlay">

          <div className="attendance-modal">

            <div className="modal-header">

              <div>
                <h2>Mark Attendance</h2>
                <p>Add employee attendance record</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>

            </div>

            <form onSubmit={handleAddAttendance}>

              <div className="form-group">
                <label>Employee ID</label>

                <input
                  type="text"
                  name="employeeId"
                  placeholder="Enter Employee ID"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Employee Name</label>

                <input
                  type="text"
                  name="employeeName"
                  placeholder="Enter Employee Name"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Date</label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                  </select>
                </div>

              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Check In</label>

                  <input
                    type="time"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Check Out</label>

                  <input
                    type="time"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                  />
                </div>

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-attendance-btn"
                >
                  Save Attendance
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Attendance;
