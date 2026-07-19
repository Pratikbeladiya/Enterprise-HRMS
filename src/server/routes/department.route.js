const express = require("express");

const router = express.Router();

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById
} = require("../controllers/department.controller");

router.post("/", createDepartment);
router.get("/", getAllDepartments);
router.get("/:id", getDepartmentById);

module.exports = router;