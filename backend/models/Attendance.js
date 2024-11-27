const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  selfie: { type: String, required: true }, // URL for uploaded selfie
  punchInTime: { type: String, required: true },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
