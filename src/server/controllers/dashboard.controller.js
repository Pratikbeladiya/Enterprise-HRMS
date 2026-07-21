const Employee = require("../model/employee.model");
const Department = require("../model/department.model");

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

const getSalaryStats = async (req, res) => {
  try {
    const salaryStats = await Employee.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$salary" },
          averageSalary: { $avg: "$salary" },
          highestSalary: { $max: "$salary" },
          lowestSalary: { $min: "$salary" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: salaryStats[0] || {
        totalSalary: 0,
        averageSalary: 0,
        highestSalary: 0,
        lowestSalary: 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDepartmentEmployeeStats = async (req, res) => {
  try {
    const stats = await Department.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "department",
          as: "employees",
        },
      },
      {
        $project: {
          departmentName: 1,
          employeeCount: { $size: "$employees" },
        },
      },
      {
        $sort: {
          employeeCount: -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: stats,
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
  getSalaryStats,
  getDepartmentEmployeeStats
};