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

//create a new leave
router.post("/", createLeave);

//get all leaves
router.get("/", getAllLeaves);

//apply for leave
router.post("/apply", applyLeave);

//approve leave by id
router.put("/:id/approve", approveLeave);

//reject leave by id 
router.put("/:id/reject", rejectLeave);

//get employee leave history by employee id 
router.get("/employee/:employeeId", getEmployeeLeaveHistory);

//get leave summary
router.get("/summary", getLeaveSummary);


//get leave by id
router.get("/:id", getLeaveById);

//update leave by id 
router.put("/:id", updateLeave);

//delete leave by id 
router.delete("/:id", deleteLeave);

module.exports = router;