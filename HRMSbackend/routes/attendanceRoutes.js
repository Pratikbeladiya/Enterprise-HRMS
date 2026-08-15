const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// @route   GET /api/attendance
// @desc    Get all attendance logs (or filter by specific date query)
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    const filter = date ? { date } : {};
    const records = await Attendance.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return res.status(500).json({ success: false, message: 'Server error while fetching attendance' });
  }
});

// @route   POST /api/attendance
// @desc    Clock-in / Record attendance
router.post('/', async (req, res) => {
  try {
    const { employeeId, name, status, time, date } = req.body;

    if (!employeeId || !name) {
      return res.status(400).json({ success: false, message: 'Employee ID and name are required' });
    }

    const todayDate = date || new Date().toISOString().split('T')[0];

    // Check if an entry already exists for this employee today
    let record = await Attendance.findOne({ employeeId, date: todayDate });

    if (record) {
      // Update existing entry if present
      record.status = status || record.status;
      record.time = time || record.time;
      await record.save();
      return res.status(200).json({ success: true, message: 'Attendance updated', data: record });
    }

    // Create new attendance entry
    record = await Attendance.create({
      employeeId,
      name,
      status: status || 'Present',
      time: time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      date: todayDate,
    });

    return res.status(201).json({ success: true, message: 'Attendance recorded successfully', data: record });
  } catch (error) {
    console.error('Error creating attendance:', error);
    return res.status(500).json({ success: false, message: 'Server error while recording attendance' });
  }
});

// @route   PUT /api/attendance/:id
// @desc    Update employee attendance status by ID
router.put('/:id', async (req, res) => {
  try {
    const { status, time } = req.body;

    const record = await Attendance.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Attendance record not found' });
    }

    if (status) record.status = status;
    if (time) record.time = time;

    await record.save();

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: record,
    });
  } catch (error) {
    console.error('Error updating attendance:', error);
    return res.status(500).json({ success: false, message: 'Server error while updating attendance' });
  }
});

// @route   DELETE /api/attendance/:id
// @desc    Delete attendance record
router.delete('/:id', async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Attendance record not found' });
    }

    return res.status(200).json({ success: true, message: 'Attendance record removed' });
  } catch (error) {
    console.error('Error deleting attendance:', error);
    return res.status(500).json({ success: false, message: 'Server error while deleting record' });
  }
});

module.exports = router;