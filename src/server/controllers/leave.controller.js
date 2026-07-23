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
    const {
      status,
      leaveType,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (leaveType) filter.leaveType = leaveType;

    const skip = (page - 1) * limit;

    const leaves = await Leave.find(filter)
      .populate(
        "employee",
        "employeeId firstName lastName designation"
      )
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Leave.countDocuments(filter);

    return res.status(200).json({
      success: true,
      totalRecords: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
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
    // Validate totalDays
    if (
      req.body.totalDays !== undefined &&
      req.body.totalDays <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Total leave days must be greater than zero",
      });
    }

    // Validate dates
    if (
      req.body.startDate &&
      req.body.endDate &&
      new Date(req.body.startDate) > new Date(req.body.endDate)
    ) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be after end date",
      });
    }

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
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

    // 👇 STEP 1
    const {
      employee,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
    } = req.body;

    // 👇 STEP 2 (Required Field Validation)
    if (
      !employee ||
      !leaveType ||
      !startDate ||
      !endDate ||
      !totalDays ||
      !reason
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 👇 STEP 3 (Total Days Validation)
    if (totalDays <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total leave days must be greater than zero",
      });
    }

    // 👇 STEP 4 (Date Validation)
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be after end date",
      });
    }

    // 👇 STEP 5 (Overlap Validation)
    const existingLeave = await Leave.findOne({
      employee,
      status: { $ne: "Rejected" },
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
        },
      ],
    });

    if (existingLeave) {
      return res.status(409).json({
        success: false,
        message: "Leave request overlaps with an existing leave",
      });
    }

    // 👇 Create Leave
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

const getLeaveSummary = async (req, res) => {
  try {
    const summary = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          totalRequests: { $sum: 1 },
          totalLeaveDays: { $sum: "$totalDays" },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          totalRequests: 1,
          totalLeaveDays: 1,
        },
      },
      {
        $sort: {
          status: 1,
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
  createLeave,
  getAllLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave,
  applyLeave,
  approveLeave,
  rejectLeave,
  getEmployeeLeaveHistory,
  getLeaveSummary,
};