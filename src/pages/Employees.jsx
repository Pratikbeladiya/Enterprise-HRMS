import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Employees.css";

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
  FaDownload,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

function Employees() {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [departmentFilter, setDepartmentFilter] = useState("All");

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    designation: "",
    email: "",
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // =========================
  // ADD EMPLOYEE
  // =========================

  const handleInputChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();

    if (
      !newEmployee.name ||
      !newEmployee.department ||
      !newEmployee.designation ||
      !newEmployee.email
    ) {
      alert("Please fill all employee details.");
      return;
    }

    const employee = {
      id: `EMP${String(employees.length + 1).padStart(3, "0")}`,
      ...newEmployee,
      status: "Active",
      joinedDate: new Date(),
    };

    setEmployees([...employees, employee]);

    setNewEmployee({
      name: "",
      department: "",
      designation: "",
      email: "",
    });

    setShowForm(false);
  };

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredEmployees = employees.filter((employee) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(searchText) ||
      employee.email.toLowerCase().includes(searchText) ||
      employee.id.toLowerCase().includes(searchText) ||
      employee.designation.toLowerCase().includes(searchText);

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  // =========================
  // SUMMARY DATA
  // =========================

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const newEmployees = employees.filter((employee) => {

    const currentDate = new Date();

    const difference =
      currentDate - employee.joinedDate;

    const days =
      difference / (1000 * 60 * 60 * 24);

    return days <= 30;

  }).length;

  const departments = [
    ...new Set(
      employees.map((employee) => employee.department)
    ),
  ];

  const totalDepartments = departments.length;

  // =========================
  // DOWNLOAD EMPLOYEE DATA
  // =========================

  const handleDownload = () => {

    if (employees.length === 0) {
      alert("No employee data available to download.");
      return;
    }

    const headers =
      "Employee ID,Name,Department,Designation,Email,Status\n";

    const rows = employees
      .map(
        (employee) =>
          `${employee.id},${employee.name},${employee.department},${employee.designation},${employee.email},${employee.status}`
      )
      .join("\n");

    const csvContent = headers + rows;

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "employee-directory.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="home">

      {/* ================= SIDEBAR ================= */}

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

      {/* ================= MAIN ================= */}

      <div className="main">

        {/* TOPBAR */}

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
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
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

        {/* ================= SUMMARY CARDS ================= */}

        <div className="cards">

          <div className="card">

            <FaUsers className="card-icon blue" />

            <div>
              <h2>{totalEmployees}</h2>
              <p>Total Employees</p>
            </div>

          </div>

          <div className="card">

            <FaUserCheck className="card-icon green" />

            <div>
              <h2>{activeEmployees}</h2>
              <p>Active Employees</p>
            </div>

          </div>

          <div className="card">

            <FaUserPlus className="card-icon orange" />

            <div>
              <h2>{newEmployees}</h2>
              <p>New Employees</p>
            </div>

          </div>

          <div className="card">

            <FaBuilding className="card-icon purple" />

            <div>
              <h2>{totalDepartments}</h2>
              <p>Departments</p>
            </div>

          </div>

        </div>

        {/* ================= EMPLOYEE TABLE ================= */}

        <div className="employee-table">

          <div className="table-header">

            <div>
              <h2>Employee Directory</h2>

              <p>
                Manage all employees in your organization
              </p>
            </div>

            <div className="table-actions">

              <button
                className="add-employee-btn"
                onClick={() => setShowForm(true)}
              >
                <FaPlus /> Add Employee
              </button>

              <button
                className="filter-btn"
                onClick={() =>
                  setShowFilter(!showFilter)
                }
              >
                <FaFilter /> Filter
              </button>

              <button
                className="download-btn"
                onClick={handleDownload}
              >
                <FaDownload /> Download
              </button>

            </div>

          </div>

          {/* FILTER */}

          {showFilter && (
            <div className="employee-filter">

              <label>
                Department
              </label>

              <select
                value={departmentFilter}
                onChange={(e) =>
                  setDepartmentFilter(e.target.value)
                }
              >

                <option value="All">
                  All Departments
                </option>

                {departments.map((department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                ))}

              </select>

            </div>
          )}

          <table>

            <thead>

              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {filteredEmployees.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="empty-data"
                  >

                    <div className="empty-state">

                      <img
                        src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                        alt="No Employee"
                      />

                      <h3>
                        {employees.length === 0
                          ? "No Employees Found"
                          : "No Matching Employees"}
                      </h3>

                      <p>
                        {employees.length === 0
                          ? "Add your first employee to get started."
                          : "Try changing your search or filter."}
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredEmployees.map((employee) => (

                  <tr key={employee.id}>

                    <td>
                      {employee.id}
                    </td>

                    <td>
                      {employee.name}
                    </td>

                    <td>
                      {employee.department}
                    </td>

                    <td>
                      {employee.designation}
                    </td>

                    <td>
                      {employee.email}
                    </td>

                    <td>

                      <span className="employee-status">
                        {employee.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

          <div className="pagination">

            <button disabled>
              Previous
            </button>

            <button className="active-page">
              1
            </button>

            <button disabled>
              Next
            </button>

          </div>

        </div>

      </div>

      {/* ================= ADD EMPLOYEE MODAL ================= */}

      {showForm && (

        <div className="employee-modal-overlay">

          <div className="employee-modal">

            <div className="modal-header">

              <div>
                <h2>Add Employee</h2>
                <p>Enter employee information</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowForm(false)}
              >
                <FaTimes />
              </button>

            </div>

            <form onSubmit={handleAddEmployee}>

              <div className="modal-form-group">

                <label>
                  Employee Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter employee name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                />

              </div>

              <div className="modal-form-group">

                <label>
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  placeholder="e.g. IT, HR, Finance"
                  value={newEmployee.department}
                  onChange={handleInputChange}
                />

              </div>

              <div className="modal-form-group">

                <label>
                  Designation
                </label>

                <input
                  type="text"
                  name="designation"
                  placeholder="e.g. Software Developer"
                  value={newEmployee.designation}
                  onChange={handleInputChange}
                />

              </div>

              <div className="modal-form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="employee@example.com"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                />

              </div>

              <button
                type="submit"
                className="save-employee-btn"
              >
                <FaPlus /> Add Employee
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Employees;
