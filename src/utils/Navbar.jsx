import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>EmployeeHub</h2>
      </div>

      <div className="navbar-menu">
        <a href="/">Home</a>
        <a href="/employees">Employees</a>
        <a href="/departments">Departments</a>
        <a href="/profile">Profile</a>
      </div>

      <div className="navbar-actions">
        <button>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
