const express = require("express");

const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getEmployeeAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

// ==========================
// Attendance Routes
// ==========================

// Mark Attendance
router.post("/", markAttendance);

// Get All Attendance
router.get("/", getAttendance);

// Get Attendance By Employee
router.get("/:employeeId", getEmployeeAttendance);

// Update Attendance
router.put("/:id", updateAttendance);

// Delete Attendance
router.delete("/:id", deleteAttendance);

module.exports = router;