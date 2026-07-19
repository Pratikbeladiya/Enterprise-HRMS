const Department = require("../model/department.model");

const createDepartment = async (req, res) => {
  try {
    const {
      departmentName,
      description,
      location,
      manager,
      employeeCount,
    } = req.body;

    // Validation
    if (!departmentName || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "Department name, description and location are required.",
      });
    }

    // Duplicate check
    const existingDepartment = await Department.findOne({
      departmentName,
    });

    if (existingDepartment) {
      return res.status(409).json({
        success: false,
        message: "Department already exists.",
      });
    }

    // Create Department
    const department = await Department.create({
      departmentName,
      description,
      location,
      manager,
      employeeCount,
    });

    return res.status(201).json({
      success: true,
      message: "Department created successfully.",
      department,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("manager", "firstName lastName email");

    return res.status(200).json({
      success: true,
      totalDepartments: departments.length,
      departments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments
};