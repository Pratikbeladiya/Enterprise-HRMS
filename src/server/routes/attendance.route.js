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

//create a new attendence record
router.post("/", createAttendance);

//get all attendence record
router.get("/", getAllAttendance);

//get attendence summary
router.get("/summary", getAttendanceSummary);

//get monthly attendence report
router.get("/report", getMonthlyAttendanceReport);

//get employee attendence history
router.get("/employee/:employeeId", getEmployeeAttendanceHistory);

//get attendence record by id
router.get("/:id", getAttendanceById);

//update attendence record by id
router.put("/:id", updateAttendance);

//delete attendence record by id
router.delete("/:id", deleteAttendance);

module.exports = router;