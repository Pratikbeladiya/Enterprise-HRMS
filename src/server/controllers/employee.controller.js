const Employee= require("../model/employee.model");

const getAllEmployees = async (req, res) => {
  try {
    const { search } = req.query;

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

const employees = await Employee.find(filter)
  .populate("department", "departmentName location")
  .populate("manager", "firstName lastName email");
     

    return res.status(200).json({
      success: true,
      totalEmployees: employees.length,
      employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id)
      .populate("department", "departmentName location")
      .populate("manager", "firstName lastName email");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
      employee: updatedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
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
      return res.status(400).json({
        success: false,
        message: "All required fields are required.",
      });
    }

    // Check duplicate employee
    const existingEmployee = await Employee.findOne({
      $or: [
        { employeeId: employeeId },
        { email: email }
      ]
    });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "Employee already exists.",
      });
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

    return res.status(201).json({
      success: true,
      message: "Employee created successfully.",
      employee,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};


