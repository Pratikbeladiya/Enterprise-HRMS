const express = require("express");

const router = express.Router();

const {
  createLeave,
  getAllLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave,
} = require("../controllers/leave.controller");

router.post("/", createLeave);
router.get("/", getAllLeaves);
router.get("/:id", getLeaveById);
router.put("/:id", updateLeave);
router.delete("/:id", deleteLeave);

module.exports = router;