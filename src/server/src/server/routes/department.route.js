const express = require("express");

const router = express.Router();

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} = require("../controllers/department.controller");

//create a new department
router.post("/", createDepartment);

//get all departments
router.get("/", getAllDepartments);

//get department by id 
router.get("/:id", getDepartmentById);

//update department by id 
router.put("/:id", updateDepartment);

//delete department by id 
router.delete("/:id", deleteDepartment);

module.exports = router;