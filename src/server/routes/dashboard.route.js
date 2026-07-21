const express = require("express");

const router = express.Router();

const {
  getEmployeeStats,
  getSalaryStats
} = require("../controllers/dashboard.controller");

router.get("/employee-stats", getEmployeeStats);
router.get("/salary-stats", getSalaryStats);

module.exports = router;