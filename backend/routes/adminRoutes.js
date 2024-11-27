const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Add Teacher
router.post('/add-teacher', authMiddleware('admin'), async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const teacher = new User({ name, email, password, role: 'teacher' });
    await teacher.save();
    res.status(201).json({ msg: 'Teacher added successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error adding teacher', error: err.message });
  }
});

// Get Users (Teachers and Students)
router.get('/users', authMiddleware('admin'), async (req, res) => {
    const { role, name, page = 1, limit = 10 } = req.query;
    const query = role ? { role } : {};
  
    if (name) query.name = { $regex: name, $options: 'i' };
  
    try {
      const users = await User.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));
      const count = await User.countDocuments(query);
  
      res.json({
        users,
        total: count,
        page: Number(page),
        totalPages: Math.ceil(count / limit),
      });
    } catch (err) {
      res.status(500).json({ msg: 'Error retrieving users', error: err.message });
    }
  });
  

// Restrict User Login
router.put('/restrict-login/:id', authMiddleware('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.status = !user.status; // Toggle status
    await user.save();
    res.json({ msg: `User ${user.status ? 'activated' : 'deactivated'} successfully` });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating user status', error: err.message });
  }
});

// Change Admin Password
router.put('/change-password', authMiddleware('admin'), async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const admin = await User.findById(req.user.id);
    if (!admin || !(await bcrypt.compare(currentPassword, admin.password))) {
      return res.status(400).json({ msg: 'Invalid current password' });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating password', error: err.message });
  }
});

router.get('/dashboard', authMiddleware('admin'), async (req, res) => {
    try {
      const totalStudents = await User.countDocuments({ role: 'student' });
      const activeStudents = await User.countDocuments({ role: 'student', status: true });
      const totalTeachers = await User.countDocuments({ role: 'teacher' });
      const totalAttendance = await Attendance.countDocuments();
  
      res.json({
        totalStudents,
        activeStudents,
        totalTeachers,
        totalAttendance,
      });
    } catch (err) {
      res.status(500).json({ msg: 'Error fetching dashboard data', error: err.message });
    }
  });
  

module.exports = router;
