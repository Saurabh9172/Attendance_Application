import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const { data } = await axios.get('/api/attendance/records', {
          params: { date },
        });
        setAttendance(data);
      } catch (error) {
        console.error('Error fetching attendance records', error);
      }
    };
    fetchAttendance();
  }, [date]);

  return (
    <div>
      <h2>Student Attendance</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <ul>
        {attendance.map((record) => (
          <li key={record._id}>
            {record.studentId.name} - {record.date} - {record.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;
