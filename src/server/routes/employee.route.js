const express = require("express");
const router = express.Router();

const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee
} = require("../controllers/employee.controller");

router.get("/", getAllEmployees);
router.post("/", createEmployee);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);

module.exports = router;

