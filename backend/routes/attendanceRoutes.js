const express = require('express');
const multer = require('multer');
const Attendance = require('../models/Attendance');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });
// Mark Attendance
router.post('/mark', authMiddleware('student'), upload.single('selfie'), async (req, res) => {
  try {
    const attendance = new Attendance({
      studentId: req.user.id,
      punchInTime: new Date().toLocaleTimeString(),
      selfie: req.file.path,
    });
    await attendance.save();
    res.status(201).json({ msg: 'Attendance marked successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error marking attendance', error: err.message });
  }
});

// Get Attendance History
router.get('/history', authMiddleware('student'), async (req, res) => {
  try {
    const attendanceHistory = await Attendance.find({ studentId: req.user.id }).sort({ date: -1 });
    res.json(attendanceHistory);
  } catch (err) {
    res.status(500).json({ msg: 'Error retrieving attendance', error: err.message });
  }
});


// Get Attendance Records (Teacher/Admin)
router.get('/records', authMiddleware(['teacher', 'admin']), async (req, res) => {
    const { studentName, startDate, endDate } = req.query;
    const query = {};
  
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
  
    if (studentName) {
      const students = await User.find({
        name: { $regex: studentName, $options: 'i' },
        role: 'student',
      });
      query.studentId = { $in: students.map((s) => s._id) };
    }
  
    try {
      const attendance = await Attendance.find(query)
        .populate('studentId', 'name email')
        .sort({ date: -1 });
      res.json(attendance);
    } catch (err) {
      res.status(500).json({ msg: 'Error retrieving attendance records', error: err.message });
    }
  });

  module.exports = router;
  