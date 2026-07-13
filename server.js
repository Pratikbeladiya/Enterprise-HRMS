const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Import Employee Routes
const employeeRoutes = require("./routes/employee");

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Enterprise HRMS Backend is Running Successfully",
  });
});

// Employee Routes
app.use("/api/employees", employeeRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
