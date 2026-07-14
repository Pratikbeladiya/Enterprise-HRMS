const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Import Routes
const employeeRoutes = require("./routes/employee");

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Enterprise HRMS Backend is Running Successfully 🚀",
  });
});

// API Routes
app.use("/api/employees", employeeRoutes);

// Handle Invalid Routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});