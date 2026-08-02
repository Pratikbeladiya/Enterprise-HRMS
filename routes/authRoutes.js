const express = require("express");

const router = express.Router();

const {
  signup,
  login,
   adminSignup,
  adminLogin,
} = require("../controllers/authController");

// ==========================
// Authentication Routes
// ==========================

// User Signup
router.post("/signup", signup);

// User Login
router.post("/login", login);

// ==========================
// Admin Authentication Routes
// ==========================

// Admin Signup
router.post("/admin-signup", adminSignup);

// Admin Login
router.post("/admin-login", adminLogin);

module.exports = router;