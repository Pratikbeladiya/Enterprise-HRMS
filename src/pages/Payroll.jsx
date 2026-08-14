import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FaPlus,
  FaTimes,
  FaFileInvoiceDollar,
  FaTrash,
} from "react-icons/fa";

function Payroll() {
  const navigate = useNavigate();

  const [payrolls, setPayrolls] = useState(() => {
    const saved = localStorage.getItem("payrollRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    month: new Date().toISOString().slice(0, 7),
    basicSalary: "",
    hra: "",
    medical: "",
    travel: "",
    bonus: "",
    pf: "",
    professionalTax: "",
    status: "Paid",
  });

  useEffect(() => {
    localStorage.setItem(
      "payrollRecords",
      JSON.stringify(payrolls)
    );
  }, [payrolls]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateSalary = (data) => {
    const basic = Number(data.basicSalary) || 0;
    const hra = Number(data.hra) || 0;
    const medical = Number(data.medical) || 0;
    const travel = Number(data.travel) || 0;
    const bonus = Number(data.bonus) || 0;
    const pf = Number(data.pf) || 0;
    const professionalTax =
      Number(data.professionalTax) || 0;

    const allowance =
      hra + medical + travel + bonus;

    const deductions =
      pf + professionalTax;

    const netSalary =
      basic + allowance - deductions;

    return {
      basic,
      allowance,
      deductions,
      netSalary,
      hra,
      medical,
      travel,
      bonus,
      pf,
      professionalTax,
    };
  };

  const handleAddPayroll = (e) => {
    e.preventDefault();

    if (
      !formData.employeeId ||
      !formData.employeeName ||
      !formData.month
    ) {
      alert(
        "Please enter Employee ID, Employee Name and Month."
      );
      return;
    }

    const salary = calculateSalary(formData);

    const newPayroll = {
      id: Date.now(),
      employeeId: formData.employeeId,
      employeeName: formData.employeeName,
      month: formData.month,
      status: formData.status,
      ...salary,
    };

    setPayrolls((prev) => [
      ...prev,
      newPayroll,
    ]);

    setFormData({
      employeeId: "",
      employeeName: "",
      month: new Date().toISOString().slice(0, 7),
      basicSalary: "",
      hra: "",
      medical: "",
      travel: "",
      bonus: "",
      pf: "",
      professionalTax: "",
      status: "Paid",
    });

    setShowModal(false);
  };

  const deletePayroll = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payroll record?"
    );

    if (!confirmDelete) return;

    setPayrolls((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const filteredPayrolls = useMemo(() => {
    return payrolls.filter((item) => {
      const matchesSearch =
        item.employeeName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.employeeId
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesMonth =
        selectedMonth === "" ||
        item.month === selectedMonth;

      return matchesSearch && matchesMonth;
    });
  }, [payrolls, search, selectedMonth]);

  const totalSalary = filteredPayrolls.reduce(
    (sum, item) => sum + item.basic,
    0
  );

  const totalAllowance = filteredPayrolls.reduce(
    (sum, item) => sum + item.allowance,
    0
  );

  const totalDeductions = filteredPayrolls.reduce(
    (sum, item) => sum + item.deductions,
    0
  );

  const totalNetSalary = filteredPayrolls.reduce(
    (sum, item) => sum + item.netSalary,
    0
  );

  const selectedPayroll =
    filteredPayrolls.length > 0
      ? filteredPayrolls[0]
      : null;

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedMonth("");
  };

  return (
    <div className="home">

      {/* Sidebar */}

      <div className="sidebar">

        <div className="logo">
          <h2>HRMS</h2>
          <p>Payroll Management</p>
        </div>

        <ul className="menu">

          <li
            onClick={() =>
              navigate("/Dashboard")
            }
          >
            🏠 Dashboard
          </li>

          <li
            onClick={() =>
              navigate("/employees")
            }
          >
            👨 Employees
          </li>

          <li
            onClick={() =>
              navigate("/attendance")
            }
          >
            📝 Attendance
          </li>

          <li
            className="active"
            onClick={() =>
              navigate("/payroll")
            }
          >
            💰 Payroll
          </li>

          <li
            onClick={() =>
              navigate("/leave")
            }
          >
            📅 Leave
          </li>

          <li
            onClick={() =>
              navigate("/reports")
            }
          >
            📊 Reports
          </li>

          <li
            onClick={() =>
              navigate("/settings")
            }
          >
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
            <h1>Payroll</h1>
            <p>
              Employee Payroll Management
            </p>
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

        {/* Summary Cards */}

        <div className="cards">

          <div className="card">

            <FaMoneyBillWave className="card-icon blue" />

            <div>
              <h2>
                {formatCurrency(totalSalary)}
              </h2>
              <p>Monthly Salary</p>
            </div>

          </div>

          <div className="card">

            <FaWallet className="card-icon green" />

            <div>
              <h2>
                {formatCurrency(totalAllowance)}
              </h2>
              <p>Allowance</p>
            </div>

          </div>

          <div className="card">

            <FaMinusCircle className="card-icon orange" />

            <div>
              <h2>
                {formatCurrency(totalDeductions)}
              </h2>
              <p>Deductions</p>
            </div>

          </div>

          <div className="card">

            <FaRupeeSign className="card-icon purple" />

            <div>
              <h2>
                {formatCurrency(totalNetSalary)}
              </h2>
              <p>Net Salary</p>
            </div>

          </div>

        </div>

        {/* Controls */}

        <div className="payroll-controls">

          <div className="payroll-filter">

            <label>Month</label>

            <input
              type="month"
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(
                  e.target.value
                )
              }
            />

          </div>

          <button
            className="clear-payroll-filter"
            onClick={clearFilters}
          >
            Clear Filter
          </button>

          <button
            className="add-payroll-btn"
            onClick={() =>
              setShowModal(true)
            }
          >
            <FaPlus />
            Add Payroll
          </button>

        </div>

        {/* Salary Details */}

        <div className="employee-table">

          <div className="table-header">

            <div>
              <h2>Salary Details</h2>

              {selectedPayroll && (
                <p>
                  {selectedPayroll.employeeName} (
                  {selectedPayroll.employeeId})
                </p>
              )}

            </div>

          </div>

          <table>

            <thead>

              <tr>
                <th>Salary Head</th>
                <th>Amount</th>
              </tr>

            </thead>

            <tbody>

              {selectedPayroll ? (
                <>
                  <tr>
                    <td>Basic Salary</td>
                    <td>
                      {formatCurrency(
                        selectedPayroll.basic
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      House Rent Allowance (HRA)
                    </td>
                    <td>
                      {formatCurrency(
                        selectedPayroll.hra
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Medical Allowance</td>
                    <td>
                      {formatCurrency(
                        selectedPayroll.medical
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Travel Allowance</td>
                    <td>
                      {formatCurrency(
                        selectedPayroll.travel
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Bonus</td>
                    <td>
                      {formatCurrency(
                        selectedPayroll.bonus
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Provident Fund (PF)</td>
                    <td>
                      -
                      {formatCurrency(
                        selectedPayroll.pf
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Professional Tax</td>
                    <td>
                      -
                      {formatCurrency(
                        selectedPayroll.professionalTax
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>Net Salary</b>
                    </td>

                    <td>
                      <b>
                        {formatCurrency(
                          selectedPayroll.netSalary
                        )}
                      </b>
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="no-data"
                  >
                    No Payroll Data Available
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* Payroll History */}

        <div className="employee-table">

          <div className="table-header">

            <div>
              <h2>Payslip History</h2>
              <p>
                {filteredPayrolls.length} record(s)
              </p>
            </div>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Month</th>
                  <th>Net Salary</th>
                  <th>Status</th>
                  <th>Payslip</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {filteredPayrolls.length === 0 ? (

                  <tr>
                    <td
                      colSpan="7"
                      className="no-data"
                    >
                      No Payroll Data Available
                    </td>
                  </tr>

                ) : (

                  filteredPayrolls.map(
                    (payroll) => (

                      <tr key={payroll.id}>

                        <td>
                          {payroll.employeeId}
                        </td>

                        <td>
                          <strong>
                            {payroll.employeeName}
                          </strong>
                        </td>

                        <td>
                          {payroll.month}
                        </td>

                        <td>
                          {formatCurrency(
                            payroll.netSalary
                          )}
                        </td>

                        <td>
                          <span
                            className={`payroll-status ${payroll.status.toLowerCase()}`}
                          >
                            {payroll.status}
                          </span>
                        </td>

                        <td>

                          <button
                            className="payslip-btn"
                            onClick={() =>
                              alert(
                                `Payslip for ${payroll.employeeName} - ${payroll.month}`
                              )
                            }
                          >
                            <FaFileInvoiceDollar />
                            View
                          </button>

                        </td>

                        <td>

                          <button
                            className="delete-payroll-btn"
                            onClick={() =>
                              deletePayroll(
                                payroll.id
                              )
                            }
                          >
                            <FaTrash />
                          </button>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* Add Payroll Modal */}

      {showModal && (

        <div className="payroll-modal-overlay">

          <div className="payroll-modal">

            <div className="modal-header">

              <div>
                <h2>Add Payroll</h2>
                <p>
                  Enter employee salary details
                </p>
              </div>

              <button
                className="close-payroll-modal"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <FaTimes />
              </button>

            </div>

            <form
              onSubmit={handleAddPayroll}
            >

              <div className="form-row">

                <div className="form-group">
                  <label>
                    Employee ID
                  </label>

                  <input
                    type="text"
                    name="employeeId"
                    placeholder="EMP001"
                    value={
                      formData.employeeId
                    }
                    onChange={
                      handleInputChange
                    }
                  />
                </div>

                <div className="form-group">
                  <label>
                    Employee Name
                  </label>

                  <input
                    type="text"
                    name="employeeName"
                    placeholder="Employee Name"
                    value={
                      formData.employeeName
                    }
                    onChange={
                      handleInputChange
                    }
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Month</label>

                  <input
                    type="month"
                    name="month"
                    value={formData.month}
                    onChange={
                      handleInputChange
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={
                      handleInputChange
                    }
                  >
                    <option value="Paid">
                      Paid
                    </option>

                    <option value="Pending">
                      Pending
                    </option>
                  </select>
                </div>

              </div>

              <h3 className="salary-section-title">
                Earnings
              </h3>

              <div className="form-row">

                <div className="form-group">
                  <label>
                    Basic Salary
                  </label>

                  <input
                    type="number"
                    name="basicSalary"
                    placeholder="0"
                    min="0"
                    value={
                      formData.basicSalary
                    }
                    onChange={
                      handleInputChange
                    }
                  />
                </div>

                <div className="form-group">
                  <label>
                    HRA
                  </label>

                  <input
                    type="number"
                    name="hra"
                    placeholder="0"
                    min="0"
                    value={formData.hra}
                    onChange={
                      handleInputChange
                    }
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>
                    Medical Allowance
                  </label>

                  <input
                    type="number"
                    name="medical"
                    placeholder="0"
                    min="0"
                    value={
                      formData.medical
                    }
                    onChange={
                      handleInputChange
                    }
                  />
                </div>

                <div className="form-group">
                  <label>
                    Travel Allowance
                  </label>

                  <input
                    type="number"
                    name="travel"
                    placeholder="0"
                    min="0"
                    value={
                      formData.travel
                    }
                    onChange={
                      handleInputChange
                    }
                  />
              
