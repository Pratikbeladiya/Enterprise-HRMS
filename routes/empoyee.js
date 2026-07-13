const express = require("express");

const router = express.Router();

// Get all employees
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee list fetched successfully",
    employees: [],
  });
});

// Get employee by ID
router.get("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee details fetched successfully",
    employeeId: req.params.id,
  });
});

module.exports = router;
