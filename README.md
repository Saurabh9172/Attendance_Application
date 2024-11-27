# Attendance Management System

An Attendance Management System built with a **Node.js** and **Express.js** backend, a **React.js** frontend, and a **MongoDB** database. This system allows users to register, log in, and manage attendance records while offering separate modules for students, teachers, and admins.

---

## Features

### Student Module
- **Registration and Login**: Students can register and log in to access their accounts.
- **Mark Attendance**: Students can mark their attendance, which captures the current date, time, and a selfie.
- **View Attendance History**: Students can view their attendance records in a paginated format.

### Teacher Module
- **Login**: Teachers can log in to their accounts.
- **View Attendance**: Teachers can view the attendance of all students with filtering and pagination.
- **View Student Profiles**: Teachers can view detailed student profiles, including attendance history.

### Admin Module
- **Login**: Admins can log in with special privileges.
- **Manage Users**: Admins can add, view, and disable teachers and students.
- **Monitor Attendance**: Admins can view and manage attendance records across all users.

---

## Technologies Used

### Backend
- **Node.js**: Server runtime.
- **Express.js**: Backend framework for building REST APIs.
- **MongoDB**: NoSQL database for storing user and attendance data.
- **Mongoose**: ODM library for MongoDB.
- **JWT**: For authentication and session management.
- **Swagger**: API documentation.

### Frontend
- **React.js**: UI library for building the user interface.
- **Material-UI (MUI)**: For styling and pre-built components.
- **Axios**: For making API requests.
- **React Router**: For navigation and routing.

---

## Installation

### Prerequisites
- **Node.js** and **npm** installed on your machine.
- **MongoDB** installed locally or access to a MongoDB Atlas instance.

### Steps to Set Up

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/attendance-management-system.git
   cd attendance-management-system
