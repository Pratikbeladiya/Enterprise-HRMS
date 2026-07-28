import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

import {
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

import {
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

function Login() {

  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  // Form States

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Login Validation

  const handleLogin = () => {

    if (!emailOrPhone || !password) {
      alert("Please fill all fields.");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phonePattern =
      /^[0-9]{10}$/;

    if (
      !emailPattern.test(emailOrPhone) &&
      !phonePattern.test(emailOrPhone)
    ) {
      alert("Enter a valid Email or 10-digit Mobile Number.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    alert("User Login Successful!");

    navigate("/Dashboard");

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

        <div className="role-selector">

  <button
    className={role === "user" ? "role-btn active" : "role-btn"}
    onClick={() => setRole("user")}
    type="button"
  >
    👤 User
  </button>

  <button
  className="role-btn"
  onClick={() => navigate("/admin-login")}
  type="button"
>
  🛡️ Admin
</button>

</div>

        {/* Email / Mobile */}

        <div className="input-box">

          <FaEnvelope className="icon" />

          <input
            type="text"
            placeholder="Email or Mobile Number"
            value={emailOrPhone}
            onChange={(e) =>
              setEmailOrPhone(e.target.value)
            }
          />

        </div>

        {/* Password */}

        <div className="input-box">

          <FaLock className="icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
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

        {/* Remember Me & Forgot Password */}

        <div className="login-options">

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
          className="signup-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Google Button */}

        <button className="google-btn">

          <FaGoogle />

          Continue with Google

        </button>

        {/* Signup Link */}

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