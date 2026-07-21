const express = require("express");

const router = express.Router();

const {
  getEmployeeStats,
  getSalaryStats,
  getDepartmentEmployeeStats
} = require("../controllers/dashboard.controller");

router.get("/employee-stats", getEmployeeStats);
router.get("/salary-stats", getSalaryStats);
router.get("/department-stats", getDepartmentEmployeeStats);

module.exports = router;