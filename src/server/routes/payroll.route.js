const express = require("express");

const router = express.Router();

const {
  createPayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
 getEmployeePayrollHistory,
   getMonthlyPayrollSummary,
} = require("../controllers/payroll.controller");

router.post("/", createPayroll);
router.get("/", getAllPayrolls);
router.get("/summary", getMonthlyPayrollSummary);
router.get("/employee/:employeeId", getEmployeePayrollHistory);

router.get("/:id", getPayrollById);
router.put("/:id", updatePayroll);
router.delete("/:id", deletePayroll);

module.exports = router;