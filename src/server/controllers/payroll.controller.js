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
    const payrolls = await Payroll.find().populate(
      "employee",
      "employeeId firstName lastName designation"
    );

    return res.status(200).json({
      success: true,
      count: payrolls.length,
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

module.exports = {
  createPayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
};