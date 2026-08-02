const express = require("express");
const router = express.Router();

const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employee.controller");


//get all employees
router.get("/", getAllEmployees);

//create a new employee
router.post("/", createEmployee);

//get employee by id 
router.get("/:id", getEmployeeById);

//update employee by id
router.put("/:id", updateEmployee);

//delete employee by id 
router.delete("/:id", deleteEmployee);

module.exports = router;

