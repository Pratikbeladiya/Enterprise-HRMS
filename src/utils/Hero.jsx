import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">Employee Management System</span>

        <h1>
          Manage Your Employees
          <br />
          <span>Smarter & Faster</span>
        </h1>

        <p>
          Manage employees, departments, attendance, payroll and leave
          efficiently from a single platform.
        </p>

        <div className="hero-actions">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
