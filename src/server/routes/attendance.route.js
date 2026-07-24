const express = require("express");
const router = express.Router();

const {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getEmployeeAttendanceHistory,
  getAttendanceSummary,
  getMonthlyAttendanceReport
} = require("../controllers/attendance.controller");

router.post("/", createAttendance);
router.get("/", getAllAttendance);
router.get("/summary", getAttendanceSummary);
router.get("/report", getMonthlyAttendanceReport);
router.get("/employee/:employeeId", getEmployeeAttendanceHistory);
router.get("/:id", getAttendanceById);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;