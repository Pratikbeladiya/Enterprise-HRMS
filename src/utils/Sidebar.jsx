import React from "react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>EmployeeHub</h3>
      </div>

      <nav className="sidebar-menu">
        <a href="/">Dashboard</a>
        <a href="/employees">Employees</a>
        <a href="/departments">Departments</a>
        <a href="/attendance">Attendance</a>
        <a href="/payroll">Payroll</a>
        <a href="/leave">Leave Management</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
