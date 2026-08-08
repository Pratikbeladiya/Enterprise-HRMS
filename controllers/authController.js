const User = require("../models/User");
const Admin = require("../models/Admin");

// ==========================
// User Signup
// ==========================
const signup = async (req, res) => {
  try {
    const {
  fullName,
  email,
  phone,
  password,
  companyCode,
} = req.body;
    // Check Existing User
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create User
    const user = await User.create({
      fullName,
      email,
      phone,
      password,
      companyCode,
    });

    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// User Login
// ==========================
const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: emailOrPhone },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Admin Signup
// ==========================
const adminSignup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      companyName,
      companyCode,
      phone,
      password,
    } = req.body;

    const existingAdmin = await Admin.findOne({
      $or: [
        { email },
        { companyCode },
      ],
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const admin = await Admin.create({
      fullName,
      email,
      companyName,
      companyCode,
      phone,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Admin Account Created Successfully",
      admin,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Admin Login
// ==========================
const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (admin.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin Login Successful",
      admin,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  signup,
  login,
  adminSignup,
  adminLogin,
};

