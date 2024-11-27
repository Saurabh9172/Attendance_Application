import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

const Attendance = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('selfie', file);

    try {
      await axios.post('/api/attendance/mark', formData);
      alert('Attendance marked successfully');
    } catch (error) {
      console.error('Error marking attendance', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Mark Attendance</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Attendance;
