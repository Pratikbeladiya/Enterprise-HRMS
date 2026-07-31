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
   getPayrollDashboard,
} = require("../controllers/payroll.controller");

//create a new payroll
router.post("/", createPayroll);

//get all payrolls
router.get("/", getAllPayrolls);

//get payroll dashboard
router.get("/dashboard", getPayrollDashboard);

//get monthly payroll summary
router.get("/summary", getMonthlyPayrollSummary);

//get employee payroll history by employee id
router.get("/employee/:employeeId", getEmployeePayrollHistory);

//get payroll by id
router.get("/:id", getPayrollById);

//update payroll by id 
router.put("/:id", updatePayroll);

//delete payroll by id 
router.delete("/:id", deletePayroll);

module.exports = router;