const express = require("express");
const router = express.Router();

const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
} = require("../controllers/employee.controller");

router.get("/", getAllEmployees);
router.post("/", createEmployee);
router.get("/:id", getEmployeeById);

module.exports = router;

