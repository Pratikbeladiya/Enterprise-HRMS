const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, 'Employee ID is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Employee name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role/Designation is required'],
      trim: true,
    },
    dept: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    manager: {
      type: String,
      required: [true, 'Manager name is required'],
      trim: true,
    },
    joiningDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);