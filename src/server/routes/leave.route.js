const express = require("express");

const router = express.Router();

const {
  createLeave,
  getAllLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave,
  applyLeave,
  approveLeave,
  rejectLeave,
 getEmployeeLeaveHistory,
 getLeaveSummary,
} = require("../controllers/leave.controller");

router.post("/", createLeave);
router.get("/", getAllLeaves);
router.post("/apply", applyLeave);

router.put("/:id/approve", approveLeave);

router.put("/:id/reject", rejectLeave);

router.get("/employee/:employeeId", getEmployeeLeaveHistory);

router.get("/summary", getLeaveSummary);

router.get("/employee/:employeeId", getEmployeeLeaveHistory);

router.get("/:id", getLeaveById);
router.put("/:id", updateLeave);
router.delete("/:id", deleteLeave);

module.exports = router;