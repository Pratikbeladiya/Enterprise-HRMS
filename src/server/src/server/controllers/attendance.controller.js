const mongoose = require("mongoose");
const Attendance = require("../model/attendance.model");
const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

// Create Attendance
const createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    return successResponse(
      res,
      201,
      "Attendance created successfully",
      attendance
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Get All Attendance
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate(
      "employee",
      "employeeId firstName lastName"
    );

    return successResponse(
      res,
      200,
      "Attendance fetched successfully",
      {
        count: attendance.length,
        attendance,
      }
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Get Attendance By Id
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id).populate(
      "employee",
      "employeeId firstName lastName"
    );

    if (!attendance) {
      return errorResponse(
        res,
        404,
        "Attendance not found"
      );
    }

    return successResponse(
      res,
      200,
      "Attendance fetched successfully",
      attendance
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Update Attendance
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!attendance) {
      return errorResponse(
        res,
        404,
        "Attendance not found"
      );
    }

    return successResponse(
      res,
      200,
      "Attendance updated successfully",
      attendance
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Delete Attendance
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return errorResponse(
        res,
        404,
        "Attendance not found"
      );
    }

    return successResponse(
      res,
      200,
      "Attendance deleted successfully"
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Get Employee Attendance History
const getEmployeeAttendanceHistory = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const attendance = await Attendance.find({
      employee: employeeId,
    })
      .populate("employee", "employeeId firstName lastName designation")
      .sort({ date: -1 });

    return successResponse(
      res,
      200,
      "Attendance history fetched successfully",
      {
        count: attendance.length,
        attendance,
      }
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


// Attendance Summary
const getAttendanceSummary = async (req, res) => {
  try {
    const summary = await Attendance.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          total: 1,
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    return successResponse(
      res,
      200,
      "Attendance summary fetched successfully",
      summary
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Monthly Attendance Report
const getMonthlyAttendanceReport = async (req, res) => {
  try {
    const { month, year, employeeId } = req.query;

    if (!month || !year || !employeeId) {
      return errorResponse(
        res,
        400,
        "month, year and employeeId are required"
      );
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const report = await Attendance.aggregate([
      {
        $match: {
          employee: new mongoose.Types.ObjectId(employeeId),
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: "$status",
          totalDays: { $sum: 1 },
          totalWorkingHours: { $sum: "$workingHours" },
        },
      },
    ]);

    return successResponse(
      res,
      200,
      "Monthly attendance report fetched successfully",
      report
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  getEmployeeAttendanceHistory,
  getAttendanceSummary,
  getMonthlyAttendanceReport,
  updateAttendance,
  deleteAttendance,
};