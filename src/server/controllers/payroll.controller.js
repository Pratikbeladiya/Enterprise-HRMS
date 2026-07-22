const Payroll = require("../model/payroll.model");

// Create Payroll
const createPayroll = async (req, res) => {
  try {
    const{
  deductions,
  bonus,
  paymentStatus,
  paymentDate,
} = req.body;

if (!employee || !month || !year || basicSalary === undefined) {
  return res.status(400).json({
    success: false,
    message: "Employee, month, year and basic salary are required",
  });
}

if (month < 1 || month > 12) {
  return res.status(400).json({
    success: false,
    message: "Month must be between 1 and 12",
  });
}

if (basicSalary < 0 || allowances < 0 || deductions < 0 || bonus < 0) {
  return res.status(400).json({
    success: false,
    message: "Salary values cannot be negative",
  });
}

const netSalary =
  Number(basicSalary) +
  Number(allowances || 0) +
  Number(bonus || 0) -
  Number(deductions || 0);

  const existingPayroll = await Payroll.findOne({
  employee,
  month,
  year,
});

if (existingPayroll) {
  return res.status(409).json({
    success: false,
    message: "Payroll already exists for this employee for the selected month and year",
  });
}

const payroll = await Payroll.create({
  employee,
  month,
  year,
  basicSalary,
  allowances,
  deductions,
  bonus,
  netSalary,
  paymentStatus,
  paymentDate,
});

    return res.status(201).json({
      success: true,
      message: "Payroll created successfully",
      data: payroll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Payrolls
const getAllPayrolls = async (req, res) => {
  try {
    const {
      month,
      year,
      paymentStatus,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const filter = {};

    if (month) filter.month = Number(month);
    if (year) filter.year = Number(year);
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const skip = (page - 1) * limit;

    const payrolls = await Payroll.find(filter)
      .populate(
        "employee",
        "employeeId firstName lastName designation"
      )
      .sort({
        [sortBy]: order === "asc" ? 1 : -1,
      })
      .skip(skip)
      .limit(Number(limit));

    const total = await Payroll.countDocuments(filter);

    return res.status(200).json({
      success: true,
      totalRecords: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      data: payrolls,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Payroll By ID
const getPayrollById = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id).populate(
      "employee",
      "employeeId firstName lastName designation"
    );

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: payroll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Payroll
const updatePayroll = async (req, res) => {

  try {

    if (req.body.month && (req.body.month < 1 || req.body.month > 12)) {
  return res.status(400).json({
    success: false,
    message: "Month must be between 1 and 12",
  });
}

if (
  req.body.basicSalary < 0 ||
  req.body.allowances < 0 ||
  req.body.deductions < 0 ||
  req.body.bonus < 0
) {
  return res.status(400).json({
    success: false,
    message: "Salary values cannot be negative",
  });
}

   const {
  basicSalary,
  allowances,
  deductions,
  bonus,
} = req.body;

const netSalary =
  Number(basicSalary) +
  Number(allowances || 0) +
  Number(bonus || 0) -
  Number(deductions || 0);

req.body.netSalary = netSalary;

const payroll = await Payroll.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true }
);

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payroll updated successfully",
      data: payroll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Payroll
const deletePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndDelete(req.params.id);

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payroll deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Employee Payroll History
const getEmployeePayrollHistory = async (req, res) => {
  try {
    const payrollHistory = await Payroll.find({
      employee: req.params.employeeId,
    })
      .populate(
        "employee",
        "employeeId firstName lastName designation department"
      )
      .sort({ year: -1, month: -1 });

    return res.status(200).json({
      success: true,
      count: payrollHistory.length,
      data: payrollHistory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Monthly Payroll Summary
const getMonthlyPayrollSummary = async (req, res) => {
  try {
    const { month, year } = req.query;

    const summary = await Payroll.aggregate([
      {
        $match: {
          month: Number(month),
          year: Number(year),
        },
      },
      {
        $group: {
          _id: null,
          totalEmployees: { $sum: 1 },
          totalBasicSalary: { $sum: "$basicSalary" },
          totalAllowances: { $sum: "$allowances" },
          totalDeductions: { $sum: "$deductions" },
          totalBonus: { $sum: "$bonus" },
          totalNetSalary: { $sum: "$netSalary" },
        },
      },
      {
        $project: {
          _id: 0,
          totalEmployees: 1,
          totalBasicSalary: 1,
          totalAllowances: 1,
          totalDeductions: 1,
          totalBonus: 1,
          totalNetSalary: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Payroll Dashboard Analytics
const getPayrollDashboard = async (req, res) => {
  try {
    const dashboard = await Payroll.aggregate([
      {
        $group: {
          _id: null,
          totalPayrolls: { $sum: 1 },
          totalSalaryPaid: { $sum: "$netSalary" },
          averageSalary: { $avg: "$netSalary" },
          paidPayrolls: {
            $sum: {
              $cond: [{ $eq: ["$paymentStatus", "Paid"] }, 1, 0],
            },
          },
          pendingPayrolls: {
            $sum: {
              $cond: [{ $eq: ["$paymentStatus", "Pending"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalPayrolls: 1,
          paidPayrolls: 1,
          pendingPayrolls: 1,
          totalSalaryPaid: 1,
          averageSalary: { $round: ["$averageSalary", 2] },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: dashboard[0] || {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
  getEmployeePayrollHistory,
  getMonthlyPayrollSummary,
  getPayrollDashboard,
};