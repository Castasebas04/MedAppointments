const express = require('express');
const cors = require('cors');
const doctorRoutes = require('./routes/doctors');
const specialtyRoutes = require('./routes/specialties');
require('dotenv').config();
require('./config/database');

const app = express();
app.use('/doctors', doctorRoutes);
app.use('/specialties', specialtyRoutes);

// Middlewares globales
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'MedAppointments API running' });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;