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

module.exports = {
  createPayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
  getEmployeePayrollHistory,
  getMonthlyPayrollSummary,
};