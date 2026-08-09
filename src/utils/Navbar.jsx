import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MyProject</div>

      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </div>

      <button className="navbar-btn">Login</button>
    </nav>
  );
};

export default Navbar;
