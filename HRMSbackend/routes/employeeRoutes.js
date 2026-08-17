const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance'); // Require the Attendance model

// @route   GET /api/employees
// @desc    Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return res.status(500).json({ success: false, message: 'Server error while fetching employees' });
  }
});

// @route   POST /api/employees
// @desc    Add a new employee and initialize default attendance
router.post('/', async (req, res) => {
  try {
    const { employeeId, name, role, dept, manager, joiningDate } = req.body;

    if (!name || !role || !dept || !manager) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Auto-generate employee ID if not provided (e.g., EI-XXXX)
    const generatedId = employeeId || `EI-${Math.floor(1000 + Math.random() * 9000)}`;

    const existing = await Employee.findOne({ employeeId: generatedId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Employee ID already exists' });
    }

    const newEmployee = await Employee.create({
      employeeId: generatedId,
      name,
      role,
      dept,
      manager,
      joiningDate: joiningDate || new Date().toISOString().split('T')[0],
    });

    // Automatically create a default attendance record for the new employee
    await Attendance.create({
      employeeId: newEmployee.employeeId,
      name: newEmployee.name,
      status: 'Present',
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      date: new Date().toISOString().split('T')[0],
    });

    return res.status(201).json({
      success: true,
      message: 'Employee added and attendance initialized successfully',
      data: newEmployee,
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    return res.status(500).json({ success: false, message: 'Server error while adding employee' });
  }
});

// @route   DELETE /api/employees/:id
// @desc    Delete an employee by their employeeId or MongoDB _id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try deleting by employeeId (e.g., "EI-0123") or MongoDB _id
    let employee = await Employee.findOneAndDelete({ employeeId: id });
    if (!employee) {
      employee = await Employee.findByIdAndDelete(id);
    }

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // Optional: Clean up associated attendance logs when employee is deleted
    await Attendance.deleteMany({ employeeId: employee.employeeId });

    return res.status(200).json({
      success: true,
      message: 'Employee and associated attendance logs removed successfully',
      data: employee,
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return res.status(500).json({ success: false, message: 'Server error while deleting employee' });
  }
});

module.exports = router;