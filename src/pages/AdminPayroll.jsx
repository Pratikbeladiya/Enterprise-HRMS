import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPayroll.css";
import axios from "axios";

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

  // =========================================
  // ADMIN
  // =========================================

  const [admin, setAdmin] = useState({
    fullName: "",
  });

  // =========================================
  // SEARCH
  // =========================================

  const [searchTerm, setSearchTerm] = useState("");

  // =========================================
  // EMPLOYEES
  // =========================================

  const [employees, setEmployees] = useState([]);

  const [loadingEmployees, setLoadingEmployees] =
    useState(true);

  // =========================================
  // PAYROLL FORM
  // =========================================

  const [payroll, setPayroll] = useState({
    employee: "",
    employeeId: "",
    department: "",
    salaryMonth: "",
    basicSalary: "",
    allowance: "",
    bonus: "",
    deduction: "",
  });

  // =========================================
  // PAYSLIPS
  // =========================================

  const [payslips, setPayslips] = useState([]);

  // =========================================
  // PREVIEW
  // =========================================

  const [showPreview, setShowPreview] =
    useState(false);

  // =========================================
  // LOAD ADMIN
  // =========================================

  useEffect(() => {

    const adminData =
      JSON.parse(
        localStorage.getItem("admin")
      );

    if (adminData) {
      setAdmin(adminData);
    }

  }, []);

  // =========================================
  // FETCH EMPLOYEES
  // =========================================

  useEffect(() => {

    const fetchEmployees = async () => {

      try {

        setLoadingEmployees(true);

        const response =
          await axios.get(
            "http://localhost:5000/api/employees"
          );

        const employeeData =
          response.data.employees ||
          response.data ||
          [];

        setEmployees(employeeData);

      } catch (error) {

        console.error(
          "Failed to fetch employees:",
          error
        );

        alert(
          "Failed to load employees."
        );

      } finally {

        setLoadingEmployees(false);

      }

    };

    fetchEmployees();

  }, []);

  // =========================================
  // HANDLE LOGOUT
  // =========================================

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");

  };

  // =========================================
  // SEARCH NAVIGATION
  // =========================================

  const handleSearch = (e) => {

    if (e.key === "Enter") {

      const value =
        searchTerm
          .toLowerCase()
          .trim();

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

  // =========================================
  // HANDLE EMPLOYEE SELECTION
  // =========================================

  const handleEmployeeChange = (e) => {

    const employeeId =
      e.target.value;

    const selectedEmployee =
      employees.find(
        (employee) =>
          employee._id === employeeId
      );

    if (!selectedEmployee) {

      setPayroll((prev) => ({
        ...prev,
        employee: "",
        employeeId: "",
        department: "",
      }));

      return;

    }

    setPayroll((prev) => ({
      ...prev,

      employee:
        selectedEmployee.fullName ||
        selectedEmployee.name ||
        "",

      employeeId:
        selectedEmployee.employeeId ||
        selectedEmployee._id ||
        "",

      department:
        selectedEmployee.department ||
        "",
    }));

  };

  // =========================================
  // HANDLE PAYROLL INPUT
  // =========================================

  const handlePayrollChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setPayroll((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // =========================================
  // CALCULATE NET SALARY
  // =========================================

  const basicSalary =
    Number(payroll.basicSalary) || 0;

  const allowance =
    Number(payroll.allowance) || 0;

  const bonus =
    Number(payroll.bonus) || 0;

  const deduction =
    Number(payroll.deduction) || 0;

  const netSalary =
    basicSalary +
    allowance +
    bonus -
    deduction;

  // =========================================
  // RESET PAYROLL
  // =========================================

  const handleReset = () => {

    setPayroll({
      employee: "",
      employeeId: "",
      department: "",
      salaryMonth: "",
      basicSalary: "",
      allowance: "",
      bonus: "",
      deduction: "",
    });

    setShowPreview(false);

  };

  // =========================================
  // PREVIEW PAYSLIP
  // =========================================

  const handlePreview = () => {

    if (
      !payroll.employee ||
      !payroll.salaryMonth ||
      !payroll.basicSalary
    ) {

      alert(
        "Please select employee, salary month and basic salary."
      );

      return;

    }

    setShowPreview(true);

  };

  // =========================================
  // GENERATE PAYSLIP
  // =========================================

  const handleGeneratePayslip = () => {

    if (!payroll.employee) {

      alert(
        "Please select an employee."
      );

      return;

    }

    if (!payroll.salaryMonth) {

      alert(
        "Please select salary month."
      );

      return;

    }

    if (!payroll.basicSalary) {

      alert(
        "Please enter basic salary."
      );

      return;

    }

    const newPayslip = {

      id: Date.now(),

      employee:
        payroll.employee,

      employeeId:
        payroll.employeeId,

      department:
        payroll.department,

      month:
        payroll.salaryMonth,

      basicSalary:
        basicSalary,

      allowance:
        allowance,

      bonus:
        bonus,

      deduction:
        deduction,

      netSalary:
        netSalary,

      status:
        "Generated",

    };

    setPayslips((prev) => [
      ...prev,
      newPayslip,
    ]);

    alert(
      "Payslip generated successfully."
    );

    handleReset();

  };

  // =========================================
  // PAYROLL SUMMARY
  // =========================================

  const totalPayroll =
    payslips.reduce(
      (total, payslip) =>
        total +
        Number(payslip.netSalary || 0),
      0
    );

  const paidAmount =
    payslips
      .filter(
        (payslip) =>
          payslip.status === "Paid"
      )
      .reduce(
        (total, payslip) =>
          total +
          Number(
            payslip.netSalary || 0
          ),
        0
      );

  const pendingAmount =
    totalPayroll -
    paidAmount;

  // =========================================
  // FORMAT CURRENCY
  // =========================================

  const formatCurrency = (amount) => {

    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;

  };

  return (

    <div className="admin-payroll-page">

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <div className="admin-sidebar">

        <div className="admin-logo">

          <h2>HRMS</h2>

          <p>
            Admin Panel
          </p>

        </div>

        <ul className="admin-menu">

          <li
            onClick={() =>
              navigate(
                "/admin-dashboard"
              )
            }
            style={{
              cursor: "pointer",
            }}
          >
            🏠 Dashboard
          </li>

          <li
            onClick={() =>
              navigate(
                "/admin-employees"
              )
            }
            style={{
              cursor: "pointer",
            }}
          >
            👨 Employees
          </li>

          <li
            onClick={() =>
              navigate(
                "/admin-attendance"
              )
            }
            style={{
              cursor: "pointer",
            }}
          >
            📝 Attendance
          </li>

          <li className="admin-active">
            💰 Payroll
          </li>

          <li
            onClick={() =>
              navigate(
                "/admin-leave"
              )
            }
            style={{
              cursor: "pointer",
            }}
          >
            📅 Leave
          </li>

          <li
            onClick={() =>
              navigate(
                "/admin-reports"
              )
            }
            style={{
              cursor: "pointer",
            }}
          >
            📊 Reports
          </li>

          <li
            onClick={() =>
              navigate(
                "/admin-settings"
              )
            }
            style={{
              cursor: "pointer",
            }}
          >
            <FaCog />
            Settings
          </li>

          <li
            onClick={handleLogout}
            style={{
              cursor: "pointer",
            }}
          >
            <FaSignOutAlt />
            Logout
          </li>

        </ul>

      </div>

      {/* =====================================
          MAIN
      ===================================== */}

      <div className="admin-main">

        {/* ===================================
            TOPBAR
        =================================== */}

        <div className="admin-topbar">

          <div>

            <h1>
              Payroll Management
            </h1>

            <p>
              Manage Employee Salary & Payslips
            </p>

          </div>

          <div className="admin-top-right">

            <div className="admin-search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search Employee..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleSearch
                }
              />

            </div>

            <FaBell
              className="admin-bell"
            />

            <img
              src="https://i.pravatar.cc/150?img=15"
              alt="Admin"
              className="admin-profile"
            />

          </div>

        </div>

        {/* ===================================
            WELCOME
        =================================== */}

        <div className="admin-welcome-card">

          <h2>
            Welcome,{" "}
            {admin.fullName ||
              "Admin"}{" "}
            👋
          </h2>

          <p>
            Generate and manage employee payroll.
          </p>

        </div>

        {/* ===================================
            SUMMARY CARDS
        =================================== */}

        <div className="admin-payroll-cards">

          <div className="admin-payroll-card">

            <FaMoneyBillWave
              className="admin-payroll-icon blue"
            />

            <h2>
              {formatCurrency(
                totalPayroll
              )}
            </h2>

            <p>
              Total Payroll
            </p>

          </div>

          <div className="admin-payroll-card">

            <FaWallet
              className="admin-payroll-icon green"
            />

            <h2>
              {formatCurrency(
                paidAmount
              )}
            </h2>

            <p>
              Paid Amount
            </p>

          </div>

          <div className="admin-payroll-card">

            <FaClock
              className="admin-payroll-icon orange"
            />

            <h2>
              {formatCurrency(
                pendingAmount
              )}
            </h2>

            <p>
              Pending Amount
            </p>

          </div>

          <div className="admin-payroll-card">

            <FaUsers
              className="admin-payroll-icon purple"
            />

            <h2>
              {employees.length}
            </h2>

            <p>
              Total Employees
            </p>

          </div>

        </div>

        {/* ===================================
            PAYROLL FORM
        =================================== */}

        <div className="admin-payroll-form">

          <div className="admin-payroll-form-header">

            <h2>
              Create Payroll
            </h2>

            <div className="admin-payroll-buttons">

              <button
                className="admin-preview-btn"
                onClick={
                  handlePreview
                }
              >
                <FaEye />
                Preview
              </button>

              <button
                className="admin-reset-btn"
                onClick={
                  handleReset
                }
              >
                <FaRedo />
                Reset
              </button>

              <button
                className="admin-generate-btn"
                onClick={
                  handleGeneratePayslip
                }
              >
                <FaDownload />
                Generate Payslip
              </button>

            </div>

          </div>

          <div className="admin-payroll-grid">

            {/* Employee */}

            <div className="admin-payroll-group">

              <label>
                Employee
              </label>

              <select
                value={
                  employees.find(
                    (employee) =>
                      (employee.fullName ||
                        employee.name) ===
                      payroll.employee
                  )?._id || ""
                }
                onChange={
                  handleEmployeeChange
                }
              >

                <option value="">
                  {loadingEmployees
                    ? "Loading Employees..."
                    : "Select Employee"}
                </option>

                {employees.map(
                  (employee) => (

                    <option
                      key={
                        employee._id
                      }
                      value={
                        employee._id
                      }
                    >
                      {employee.fullName ||
                        employee.name ||
                        "Unnamed Employee"}
                    </option>

                  )
                )}

              </select>

            </div>

            {/* Employee ID */}

            <div className="admin-payroll-group">

              <label>
                Employee ID
              </label>

              <input
                type="text"
                placeholder="Auto Filled"
                value={
                  payroll.employeeId
                }
                readOnly
              />

            </div>

            {/* Department */}

            <div className="admin-payroll-group">

              <label>
                Department
              </label>

              <input
                type="text"
                placeholder="Auto Filled"
                value={
                  payroll.department
                }
                readOnly
              />

            </div>

            {/* Salary Month */}

            <div className="admin-payroll-group">

              <label>
                Salary Month
              </label>

              <input
                type="month"
                name="salaryMonth"
                value={
                  payroll.salaryMonth
                }
                onChange={
                  handlePayrollChange
                }
              />

            </div>

            {/* Basic Salary */}

            <div className="admin-payroll-group">

              <label>
                Basic Salary
              </label>

              <input
                type="number"
                name="basicSalary"
                placeholder="₹0"
                value={
                  payroll.basicSalary
                }
                onChange={
                  handlePayrollChange
                }
                min="0"
              />

            </div>

            {/* Allowance */}

            <div className="admin-payroll-group">

              <label>
                Allowance
              </label>

              <input
                type="number"
                name="allowance"
                placeholder="₹0"
                value={
                  payroll.allowance
                }
                onChange={
                  handlePayrollChange
                }
                min="0"
              />

            </div>

            {/* Bonus */}

            <div className="admin-payroll-group">

              <label>
                Bonus
              </label>

              <input
                type="number"
                name="bonus"
                placeholder="₹0"
                value={
                  payroll.bonus
                }
                onChange={
                  handlePayrollChange
                }
                min="0"
              />

            </div>

            {/* Deduction */}

            <div className="admin-payroll-group">

              <label>
                Deduction
              </label>

              <input
                type="number"
                name="deduction"
                placeholder="₹0"
                value={
                  payroll.deduction
                }
                onChange={
                  handlePayrollChange
                }
                min="0"
              />

            </div>

            {/* Net Salary */}

            <div className="admin-payroll-group">

              <label>
                Net Salary
              </label>

              <input
                type="text"
                value={
                  formatCurrency(
                    netSalary
                  )
                }
                readOnly
              />

            </div>

          </div>

        </div>

        {/* ===================================
            PAYSLIP PREVIEW
        =================================== */}

        {showPreview && (

          <div className="admin-payslip-preview">

            <div className="admin-payslip-preview-header">

              <div>
                <h2>
                  Payslip Preview
                </h2>

                <p>
                  Review payroll details before generating.
                </p>
              </div>

              <button
                className="admin-preview-close"
                onClick={() =>
                  setShowPreview(false)
                }
              >
                ×
              </button>

            </div>

            <div className="admin-payslip-preview-content">

              <div className="admin-payslip-company">

                <h2>
                  HRMS
                </h2>

                <p>
                  Employee Salary Payslip
                </p>

              </div>

              <div className="admin-payslip-info">

                <div>
                  <span>
                    Employee
                  </span>

                  <strong>
                    {payroll.employee || "-"}
                  </strong>
                </div>

                <div>
                  <span>
                    Employee ID
                  </span>

                  <strong>
                    {payroll.employeeId || "-"}
                  </strong>
                </div>

                <div>
                  <span>
                    Department
                  </span>

                  <strong>
                    {payroll.department || "-"}
                  </strong>
                </div>

                <div>
                  <span>
                    Salary Month
                  </span>

                  <strong>
                    {payroll.salaryMonth || "-"}
                  </strong>
                </div>

              </div>

              <div className="admin-salary-details">

                <div className="admin-salary-row">

                  <span>
                    Basic Salary
                  </span>

                  <strong>
                    {formatCurrency(
                      basicSalary
                    )}
                  </strong>

                </div>

                <div className="admin-salary-row">

                  <span>
                    Allowance
                  </span>

                  <strong>
                    {formatCurrency(
                      allowance
                    )}
                  </strong>

                </div>

                <div className="admin-salary-row">

                  <span>
                    Bonus
                  </span>

                  <strong>
                    {formatCurrency(
                      bonus
                    )}
                  </strong>

                </div>

                <div className="admin-salary-row deduction">

                  <span>
                    Deduction
                  </span>

                  <strong>
                    - {formatCurrency(
                      deduction
                    )}
                  </strong>

                </div>

                <div className="admin-salary-total">

                  <span>
                    Net Salary
                  </span>

                  <strong>
                    {formatCurrency(
                      netSalary
                    )}
                  </strong>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* ===================================
            GENERATED PAYSLIPS
        =================================== */}

        <div className="admin-payroll-table">

          <div className="admin-payroll-table-header">

            <div>

              <h2>
                Generated Payslips
              </h2>

              <p>
                View generated employee payslips.
              </p>

            </div>

          </div>

          <table>

            <thead>

              <tr>

                <th>
                  Employee
                </th>

                <th>
                  Month
                </th>

                <th>
                  Basic Salary
                </th>

                <th>
                  Net Salary
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {payslips.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="admin-no-data"
                  >
                    No Payslip Generated
                  </td>

                </tr>

              ) : (

                payslips.map(
                  (payslip) => (

                    <tr
                      key={
                        payslip.id
                      }
                    >

                      <td>

                        <div className="admin-payslip-employee">

                          <strong>
                            {payslip.employee}
                          </strong>

                          <small>
                            {payslip.employeeId}
                          </small>

                        </div>

                      </td>

                      <td>
                        {payslip.month}
                      </td>

                      <td>
                        {formatCurrency(
                          payslip.basicSalary
                        )}
                      </td>

                      <td>
                        <strong>
                          {formatCurrency(
                            payslip.netSalary
                          )}
                        </strong>
                      </td>

                      <td>

                        <span
                          className={`admin-payslip-status ${
                            payslip.status
                              .toLowerCase()
                          }`}
                        >
                          {payslip.status}
                        </span>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================
          END MAIN
      ===================================== */}

    </div>
  );
}

export default AdminPayroll;
