const express = require("express");
const router = express.Router();

const {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getEmployeeAttendanceHistory
} = require("../controllers/attendance.controller");

router.post("/", createAttendance);
router.get("/", getAllAttendance);
router.get("/employee/:employeeId", getEmployeeAttendanceHistory);
router.get("/:id", getAttendanceById);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;