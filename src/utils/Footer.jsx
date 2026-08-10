import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>EmployeeHub</h3>
          <p>
            Simplifying employee management with a modern and efficient
            platform.
          </p>
        </div>

        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 EmployeeHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
