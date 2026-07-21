const Employee = require("../model/employee.model");

const getEmployeeStats = async (req, res) => {
  try {
    const stats = await Employee.aggregate([
      {
        $group: {
          _id: null,
          totalEmployees: { $sum: 1 },
          activeEmployees: {
            $sum: {
              $cond: ["$isActive", 1, 0]
            }
          },
          inactiveEmployees: {
            $sum: {
              $cond: ["$isActive", 0, 1]
            }
          }
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      data: stats[0] || {
        totalEmployees: 0,
        activeEmployees: 0,
        inactiveEmployees: 0,
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