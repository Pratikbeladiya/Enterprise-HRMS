const Employee= require("../model/employee.model");

 const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("department")
      .populate("manager");

    return res.status(200).json({
      success: true,
      employees,
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
  createEmployee
};


