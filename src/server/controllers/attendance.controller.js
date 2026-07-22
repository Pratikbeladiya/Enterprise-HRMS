const Attendance = require("../model/attendance.model");

// Create Attendance
const createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      data: attendance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Attendance
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate(
      "employee",
      "employeeId firstName lastName"
    );

    return res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
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
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
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
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: attendance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Attendance
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
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

    return res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
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
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  getEmployeeAttendanceHistory,
  getAttendanceSummary,
  updateAttendance,
  deleteAttendance,
};