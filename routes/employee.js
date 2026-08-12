const express = require("express");

const router = express.Router();

const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

// ==========================
// Employee Routes
// ==========================

// Get All Employees
router.get("/", getAllEmployees);

// Get Employee By ID
router.get("/:id", getEmployeeById);

// Create Employee
router.post("/", createEmployee);

// Update Employee
router.put("/:id", updateEmployee);

// Delete Employee
router.delete("/:id", deleteEmployee);

module.exports = router;
