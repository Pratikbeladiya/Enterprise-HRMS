import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./AdminLogin.css";

import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaBuilding,
} from "react-icons/fa";

import {
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

function AdminLogin() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [companyCode, setCompanyCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {

    if (!companyCode || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Enter a valid Email Address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    alert("Admin Login Successful!");

    navigate("/admin-dashboard");

  };

  return (

    <div className="admin-login-container">

      {/* Left */}

      <div className="admin-login-left">

        <div className="admin-logo">

          <h1>HRMS</h1>

          <p>Human Resource Management System</p>

        </div>

        <h2>Welcome Back Admin</h2>

        <p className="admin-subtitle">
          Login to access your Admin Dashboard
        </p>

        <div className="admin-role-selector">

          <button
            className="admin-role-btn"
            onClick={() => navigate("/login")}
            type="button"
          >
            👤 User
          </button>

          <button
            className="admin-role-btn admin-active"
            type="button"
          >
            🛡️ Admin
          </button>

        </div>

        {/* Company Code */}

        <div className="admin-input-box">

          <FaBuilding className="admin-icon" />

          <input
            type="text"
            placeholder="Enter Company Code"
            value={companyCode}
            onChange={(e) =>
              setCompanyCode(e.target.value)
            }
          />

        </div>

        {/* Email */}

        <div className="admin-input-box">

          <FaEnvelope className="admin-icon" />

          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        {/* Password */}

        <div className="admin-input-box">

          <FaLock className="admin-icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <IoEyeOffOutline />
            ) : (
              <IoEyeOutline />
            )}
          </span>

        </div>

        {/* Remember Me & Forgot Password */}

        <div className="admin-login-options">

          <label>

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(e.target.checked)
              }
            />

            Remember Me

          </label>

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

        </div>

        {/* Login Button */}

        <button
          className="admin-login-btn"
          onClick={handleLogin}
        >
          Login as Admin
        </button>

        {/* Google Button */}

        <button className="admin-google-btn">

          <FaGoogle />

          Continue with Google

        </button>

        {/* Signup Link */}

        <p className="admin-login-text">

          Don't have an Admin account?

          <Link to="/admin-signup"> Sign Up</Link>

        </p>

      </div>

      {/* Right Section */}

      <div className="admin-login-right">

        <h1>Smart HR Management</h1>

        <p>
          Manage employees, attendance,
          payroll and leave with one
          powerful HRMS platform.
        </p>

        <img
          src="/hrms-banner.png"
          alt="HRMS"
          className="admin-hrms-image"
        />

      </div>

    </div>

  );
}

export default AdminLogin;