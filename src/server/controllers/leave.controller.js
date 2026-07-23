const Leave = require("../model/leave.model");
const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

// Create Leave
const createLeave = async (req, res) => {
  try {
    const leave = await Leave.create(req.body);

    return successResponse(
  res,
  201,
  "Leave request created successfully",
  leave
);
  } catch (error) {
    return errorResponse(res,500,error.message);
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

   return successResponse(
  res,
  200,
  "Leaves fetched successfully",
  {
    totalRecords: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    leaves,
  }
);
  } catch (error) {
    return errorResponse(res,500,error.message);
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
     return errorResponse(
  res,
  404,
  "Leave record not found"
);
    }

    return successResponse(
  res,
  200,
  "Leave fetched successfully",
  leave
);
  } catch (error) {
   return errorResponse(res,500,error.message);
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
     return errorResponse(
  res,
  400,
  "Total leave days must be greater than zero"
);
    }

    // Validate dates
    if (
      req.body.startDate &&
      req.body.endDate &&
      new Date(req.body.startDate) > new Date(req.body.endDate)
    ) {
      return errorResponse(
  res,
  400,
  "Start date cannot be after end date"
);
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
      return errorResponse(
  res,
  404,
  "Leave record not found"
);
    }

    return successResponse(
  res,
  200,
  "Leave updated successfully",
  leave
);
  } catch (error) {
    return errorResponse(res,500,error.message);
  }
};

// Delete Leave
const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);

    if (!leave) {
      return errorResponse(
  res,
  404,
  "Leave record not found"
);
    }

    return successResponse(
  res,
  200,
  "Leave deleted successfully"
);
  } catch (error) {
   return errorResponse(res,500,error.message);
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
     return errorResponse(
  res,
  400,
  "All fields are required"
);
    }

    // 👇 STEP 3 (Total Days Validation)
    if (totalDays <= 0) {
      return errorResponse(
  res,
  400,
  "Total leave days must be greater than zero"
);
    }

    // 👇 STEP 4 (Date Validation)
    if (new Date(startDate) > new Date(endDate)) {
     return errorResponse(
  res,
  400,
  "Start date cannot be after end date"
);
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
      return errorResponse(
  res,
  409,
  "Leave request overlaps with an existing leave"
);
    }

    // 👇 Create Leave
    const leave = await Leave.create(req.body);

   return successResponse(
  res,
  201,
  "Leave applied successfully",
  leave
);

  } catch (error) {
   return errorResponse(res,500,error.message);
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
     return errorResponse(
  res,
  404,
  "Leave request not found"
);
    }

    return successResponse(
  res,
  200,
  "Leave approved successfully",
  leave
);
  } catch (error) {
    return errorResponse(res,500,error.message);
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
      return errorResponse(
  res,
  404,
  "Leave request not found"
);
    }

   return successResponse(
  res,
  200,
  "Leave rejected successfully",
  leave
);
  } catch (error) {
    return errorResponse(res,500,error.message);
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

    return successResponse(
  res,
  200,
  "Leave history fetched successfully",
  {
    count: leaves.length,
    leaves,
  }
);
  } catch (error) {
    return errorResponse(res,500,error.message);
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

   return successResponse(
  res,
  200,
  "Leave summary fetched successfully",
  summary
);
  } catch (error) {
   return errorResponse(res,500,error.message);
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