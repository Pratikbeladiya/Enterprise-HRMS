const express = require("express");

const router = express.Router();

const {
  getEmployeeStats,
} = require("../controllers/dashboard.controller");

router.get("/employee-stats", getEmployeeStats);

module.exports = router;