const Department = require("../model/department.model");
const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

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
     return errorResponse(
  res,
  400,
  "Department name, description and location are required."
);
    }

    // Duplicate check
    const existingDepartment = await Department.findOne({
      departmentName,
    });

    if (existingDepartment) {
     return errorResponse(
  res,
  409,
  "Department already exists."
);
    }

    // Create Department
    const department = await Department.create({
      departmentName,
      description,
      location,
      manager,
      employeeCount,
    });

    return successResponse(
  res,
  201,
  "Department created successfully.",
  department
);
  } catch (error) {
   return errorResponse(res, 500, error.message);
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("manager", "firstName lastName email");

   return successResponse(
  res,
  200,
  "Departments fetched successfully",
  {
    totalDepartments: departments.length,
    departments,
  }
);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id)
      .populate("manager", "firstName lastName email");

    if (!department) {
      return errorResponse(
  res,
  404,
  "Department not found."
);
    }

    return successResponse(
  res,
  200,
  "Department fetched successfully",
  department
);

  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDepartment) {
     return errorResponse(
  res,
  404,
  "Department not found."
);
    }

    return successResponse(
  res,
  200,
  "Department updated successfully.",
  updatedDepartment
);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
  
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDepartment = await Department.findByIdAndDelete(id);

    if (!deletedDepartment) {
     return errorResponse(
  res,
  404,
  "Department not found."
);
    }

    return successResponse(
  res,
  200,
  "Department deleted successfully."
);
  } catch (error) {
   return errorResponse(res, 500, error.message);
  }
};
module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
};