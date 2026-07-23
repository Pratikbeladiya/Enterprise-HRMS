const Leave = require("../model/leave.model");

// Create Leave
const createLeave = async (req, res) => {
  try {
    const leave = await Leave.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Leave request created successfully",
      data: leave,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Leaves
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate(
      "employee",
      "employeeId firstName lastName designation"
    );

    return res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Leave By ID
const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate(
      "employee",
      "employeeId firstName lastName designation"
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave record not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: leave,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Leave
const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave updated successfully",
      data: leave,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Leave
const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Apply Leave
const applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: leave,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status: "Approved",
        approvedBy: req.body.approvedBy,
        remarks: req.body.remarks,
      },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave approved successfully",
      data: leave,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
        approvedBy: req.body.approvedBy,
        remarks: req.body.remarks,
      },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave rejected successfully",
      data: leave,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmployeeLeaveHistory = async (req, res) => {
  try {
    const leaves = await Leave.find({
      employee: req.params.employeeId,
    })
      .populate(
        "employee",
        "employeeId firstName lastName designation department"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLeave,
  getAllLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave,
  applyLeave,
  approveLeave,
  rejectLeave,
  getEmployeeLeaveHistory,
};