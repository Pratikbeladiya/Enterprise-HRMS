const userModel = require("../model/user.model");

// ============================
// Register User
// ============================
const registerUser = async (req, res) => {
  try {
    const { username, email, contactNumber, password } = req.body;

    // Validate required fields
    if (!username || !email || !contactNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Check if email already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    // Create new user
    const user = await userModel.create({
      username,
      email,
      contactNumber,
      password
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// ============================
// Login User
// ============================
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and Password are required"
      });
    }

    // Find user
    const isUserExist = await userModel.findOne({ username });

    if (!isUserExist) {
      return res.status(404).json({
        success: false,
        message: "User account not found"
      });
    }

    // Temporary password check
    // bcrypt will be added in Issue #6
    const isPasswordValid = password === isUserExist.password;

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User logged in successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};