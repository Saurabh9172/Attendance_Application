import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/admin/dashboard');
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Students: {stats.totalStudents}</p>
      <p>Active Students: {stats.activeStudents}</p>
      <p>Total Teachers: {stats.totalTeachers}</p>
      <p>Total Attendance: {stats.totalAttendance}</p>
    </div>
  );
};

export default Dashboard;
