import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/admin/Dashboard';
import StudentAttendance from './pages/student/Attendance';
import TeacherAttendance from './pages/teacher/Attendance';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Add the Toastify CSS


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route path="/teacher/attendance" element={<TeacherAttendance />} />
        </Routes>
        <ToastContainer />
      </Router>
      
    </AuthProvider>
  );
}

export default App;
