const Employee = require("../model/employee.model");
const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

const getAllEmployees = async (req, res) => {
  try {
    const { search, department, designation, isActive } = req.query;

    let filter = {};

    if (search) {
      filter = {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } }
        ]
      };
    }
    if (department) {
      filter.department = department;
    }
    if (designation) {
      filter.designation = {
        $regex: designation,
        $options: "i",
      };
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    //pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const employees = await Employee.find(filter)
      .populate("department", "departmentName location")
      .populate("manager", "firstName lastName email")
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    const totalEmployees = await Employee.countDocuments(filter);
    return successResponse(res, 200, "Employees fetched successfully", {
      totalEmployees,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
      employees,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id)
      .populate("department", "departmentName location")
      .populate("manager", "firstName lastName email");

    if (!employee) {
      return errorResponse(res, 404, "Employee not found.");
    }

    return successResponse(
      res,
      200,
      "Employee fetched successfully",
      employee
    );

  } catch (error) {
    return errorResponse(res, 500, error.message);
  };
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      return errorResponse(res, 404, "Employee not found.");
    }

    return successResponse(
      res,
      200,
      "Employee updated successfully.",
      updatedEmployee
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return errorResponse(res, 404, "Employee not found.");
    }

    return successResponse(
      res,
      200,
      "Employee deleted successfully."
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


const createEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      designation,
      salary,
      joiningDate,
      department,
      manager,
    } = req.body;

    // Required field validation
    if (
      !employeeId ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !gender ||
      !dateOfBirth ||
      !designation ||
      !salary
    ) {
      return errorResponse(
        res,
        400,
        "All required fields are required."
      );
    }

    // Check duplicate employee
    const existingEmployee = await Employee.findOne({
      $or: [
        { employeeId: employeeId },
        { email: email }
      ]
    });

    if (existingEmployee) {
      return errorResponse(
        res,
        409,
        "Employee already exists."
      );
    }

    // Create employee
    const employee = await Employee.create({
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      designation,
      salary,
      joiningDate,
      department,
      manager,
    });

    return successResponse(
      res,
      201,
      "Employee created successfully.",
      employee
    );

  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};


