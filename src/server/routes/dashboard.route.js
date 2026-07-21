const express = require("express");

const router = express.Router();

const {
  getEmployeeStats,
  getSalaryStats,
  getDepartmentEmployeeStats,
  getDashboardSummary
} = require("../controllers/dashboard.controller");

router.get("/employee-stats", getEmployeeStats);
router.get("/salary-stats", getSalaryStats);
router.get("/department-stats", getDepartmentEmployeeStats);
router.get("/summary", getDashboardSummary);

module.exports = router;