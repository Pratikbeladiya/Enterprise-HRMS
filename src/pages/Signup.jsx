import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Signup.css";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

import {
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

function Signup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form States

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  // Signup Validation

  const handleSignup = () => {

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    if (!agree) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    alert("Account Created Successfully!");

    navigate("/login");
  };

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
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

        </div>

        {/* Email */}

        <div className="input-box">

          <FaEnvelope className="icon" />

          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Mobile Number */}

        <div className="input-box">

          <FaPhone className="icon" />

          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
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
            onChange={(e) => setPassword(e.target.value)}
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
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <span
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          >
            {showConfirmPassword ? (
              <IoEyeOffOutline />
            ) : (
              <IoEyeOutline />
            )}
          </span>

        </div>

        {/* Terms & Conditions */}

        <div className="login-options">

          <label>

            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />

            I agree to the Terms & Conditions

          </label>

        </div>

        {/* Signup Button */}

        <button
          className="signup-btn"
          onClick={handleSignup}
        >
          Create Account
        </button>

        {/* Google Button */}

        <button className="google-btn">

          <FaGoogle />

          Continue with Google

        </button>

        {/* Login Link */}

        <p className="login-text">

          Already have an account?

          <Link to="/login"> Login</Link>

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

export default Signup;