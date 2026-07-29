import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSignup.css";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaGoogle,
  FaBuilding,
  FaKey,
} from "react-icons/fa";

import {
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

function AdminSignup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSignup = () => {

    if (
      !fullName ||
      !email ||
      !companyName ||
      !companyCode ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (!agree) {
      alert("Please accept Terms & Conditions.");
      return;
    }

    localStorage.setItem(
  "admin",
  JSON.stringify({
    fullName: fullName,
    email: email,
    companyName: companyName,
    companyCode: companyCode,
    phone: phone,
  })
);

    alert("Admin Account Created Successfully!");

    navigate("/admin-login");
  };

  return (
    <div className="signup-container">

      {/* Left Section */}

      <div className="signup-left">

        <div className="logo">
          <h1>HRMS</h1>
          <p>Human Resource Management System</p>
        </div>

        <h2>Create Admin Account</h2>

        <p className="subtitle">
          Register your company and manage employees efficiently.
        </p>

        <div className="role-selector">

          <button
            className="role-btn"
            onClick={() => navigate("/signup")}
          >
            👤 User
          </button>

          <button
            className="role-btn active"
          >
            🛡️ Admin
          </button>

        </div>

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

        {/* Company Name */}

        <div className="input-box">
          <FaBuilding className="icon" />
          <input
            type="text"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        {/* Company Code */}

        <div className="input-box">
          <FaKey className="icon" />
          <input
            type="text"
            placeholder="Enter Company Code"
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
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

          <span onClick={() => setShowPassword(!showPassword)}>
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
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          Create Admin Account
        </button>

        {/* Google Button */}

        <button className="google-btn">
          <FaGoogle />
          Continue with Google
        </button>

        <p className="login-text">
          Already have an Admin account?
          <Link to="/admin-login"> Login</Link>
        </p>

        </div>

      {/* Right Section */}

      <div className="signup-right">

        <h1>Smart HR Management</h1>

        <p>
          Register your company and manage employees,
          attendance, payroll and leave with one
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

export default AdminSignup;