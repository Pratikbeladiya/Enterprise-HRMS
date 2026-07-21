import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

import banner from "../assets/hrms-banner.png";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaGoogle,
  FaUserPlus,
} from "react-icons/fa";

import {
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="signup-page">

      {/* Left Side */}

      <div className="signup-form">

        <div className="logo-box">
          <h1>HRMS</h1>
          <p>Human Resource Management System</p>
        </div>

        <h2>Create Your Account</h2>

        <p className="subtitle">
          Join our organization and simplify HR operations
        </p>

        <div className="row">

          <div className="input-box">
            <label>Full Name</label>

            <div className="input">
              <FaUser />
              <input
                type="text"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div className="input-box">
            <label>Email Address</label>

            <div className="input">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>
          </div>

        </div>

        <div className="input-box full">
          <label>Mobile Number</label>

          <div className="input">
            <FaPhone />
            <input
              type="text"
              placeholder="Enter your mobile number"
            />
          </div>
        </div>

        <div className="row">

          <div className="input-box">
            <label>Password</label>

            <div className="input">
              <FaLock />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
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
          </div>

          <div className="input-box">
            <label>Confirm Password</label>

            <div className="input">
              <FaLock />

              <input
                type={
                  showConfirm ? "text" : "password"
                }
                placeholder="Confirm password"
              />

              <span
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
              >
                {showConfirm ? (
                  <IoEyeOffOutline />
                ) : (
                  <IoEyeOutline />
                )}
              </span>
            </div>
          </div>

        </div>

        <p className="password-note">
          Password must be at least 8 characters
        </p>

        <div className="checkbox">
          <input type="checkbox" />

          <span>
            I agree to the Terms & Conditions and Privacy
            Policy
          </span>
        </div>

        <button className="create-btn">
          <FaUserPlus />
          Create Account
        </button>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <button className="google-btn">
          <FaGoogle />
          Continue with Google
        </button>

        <p className="login-link">
          Already have an account?

          <Link to="/login">
            {" "}
            Sign in
          </Link>
        </p>

      </div>

      {/* Right Side */}

      <div className="signup-banner">

        <h1>
          Smart HR Management
          <br />
          for a Better Workplace
        </h1>

        <p>
          Manage your employees, attendance,
          payroll and more – all in one secure
          platform.
        </p>

        <img
          src={banner}
          alt="HRMS"
        />

        <div className="feature-box">

          <div>
            <h3>Secure</h3>
            <p>Your data is safe</p>
          </div>

          <div>
            <h3>Efficient</h3>
            <p>Automate HR</p>
          </div>

          <div>
            <h3>Transparent</h3>
            <p>Real-time insights</p>
          </div>

          <div>
            <h3>Reliable</h3>
            <p>24/7 Access</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;