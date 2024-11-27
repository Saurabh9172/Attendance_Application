const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

// Connect to Database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/uploads', express.static('uploads'));


// Default Route
app.get('/', (req, res) => res.send('Attendance Management Backend Running'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Attendance Management API',
      version: '1.0.0',
      description: 'API Documentation for Attendance Management System',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

