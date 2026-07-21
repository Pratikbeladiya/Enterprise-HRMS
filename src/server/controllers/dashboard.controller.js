const Employee = require("../model/employee.model");

const getEmployeeStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const activeEmployees = await Employee.countDocuments({
      isActive: true,
    });

    const inactiveEmployees = await Employee.countDocuments({
      isActive: false,
    });

    return res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getEmployeeStats,
};