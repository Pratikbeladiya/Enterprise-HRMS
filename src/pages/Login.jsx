import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";

import "./Login.css";

import {
  FaEnvelope,
  FaPhone,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

import {
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

function Login() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {

  // Future માં અહીં API call આવશે

  navigate("/home");

};

  return (
    <div className="signup-container">

      {/* Left Section */}

      <div className="signup-left">

        <div className="logo">
          <h1>HRMS</h1>
          <p>Human Resource Management System</p>
        </div>

        <h2>Welcome Back</h2>

        <p className="subtitle">
          Login to access your HRMS dashboard
        </p>

        {/* Email / Mobile */}

        <div className="input-box">
          <FaEnvelope className="icon" />

          <input
            type="text"
            placeholder="Email or Mobile Number"
          />
        </div>

        {/* Password */}

        <div className="input-box">
          <FaLock className="icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
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

        {/* Remember & Forgot */}

        <div className="login-options">

          <label>

            <input type="checkbox" />

            Remember Me

          </label>

          <a href="/forgot-password">
            Forgot Password?
          </a>

        </div>

       <button
  className="signup-btn"
  onClick={handleLogin}
>
  Login
</button>

        <button className="google-btn">
          <FaGoogle />
          Continue with Google
        </button>

       <p className="login-text">
  Don't have an account?
  <Link to="/signup"> Sign Up</Link>
</p>

      </div>

      {/* Right Section */}

      <div className="signup-right">

        <h1>Smart HR Management</h1>

        <p>
          Manage employees, attendance,
          payroll and leave with one
          powerful HRMS platform.
        </p>

        <img
  src="/hrms-banner.png"
  alt="HRMS"
  className="hrms-image"
/>

      </div>

    </div>
  );
}

export default Login;