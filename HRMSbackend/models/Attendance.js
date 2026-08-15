const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, 'Employee ID is required'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Employee name is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Present', 'On Leave', 'Sick Leave', 'Absent'],
      default: 'Present',
    },
    time: {
      type: String,
      default: () =>
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0], // e.g. "2026-08-15"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', attendanceSchema);