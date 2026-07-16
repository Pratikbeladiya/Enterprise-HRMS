import React, { useState } from "react";
import "./Signup.css";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function Signup() {

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="signup-container">

      {/* Left Section */}

      <div className="signup-left">

        <div className="logo">
          <h1>HRMS</h1>
          <p>Human Resource Management System</p>
        </div>

        <h2>Create Your Account</h2>

        <p className="subtitle">
          Join our organization and simplify HR operations
        </p>

        {/* Full Name */}

        <div className="input-box">

          <FaUser className="icon" />

          <input
            type="text"
            placeholder="Enter your full name"
          />

        </div>

        {/* Contact Number */}

        <div className="input-box">

          <FaPhone className="icon" />

          <input
            type="text"
            placeholder="Enter your contact number"
          />

        </div>

        {/* Email */}

        <div className="input-box">

          <FaEnvelope className="icon" />

          <input
            type="email"
            placeholder="Enter your email"
          />

        </div>

        {/* Password */}

        <div className="input-box">

          <FaLock className="icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
          />

          <span
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <IoEyeOffOutline />
            ) : (
              <IoEyeOutline />
            )}
          </span>

        </div>

        {/* Confirm Password */}

        <div className="input-box">

          <FaLock className="icon" />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
          />

          <span
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword ? (
              <IoEyeOffOutline />
            ) : (
              <IoEyeOutline />
            )}
          </span>

        </div>

        <button className="signup-btn">
          Create Account
        </button>

        <button className="google-btn">
          <FaGoogle />
          Continue with Google
        </button>

        <p className="login-text">
          Already have an account?
          <a href="/login"> Sign In</a>
        </p>

      </div>

      {/* Right Section */}

      <div className="signup-right">

        <h1>
          Smart HR Management
        </h1>

        <p>
          Manage employees, attendance,
          payroll and leave with one
          powerful HRMS platform.
        </p>

        <img
          src="/hrms.png"
          alt="HRMS"
        />

      </div>

    </div>
  );
}

export default Signup;
