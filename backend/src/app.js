const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database');

const app = express();

// Middlewares globales - PRIMERO
app.use(cors());
app.use(express.json());

// Rutas - DESPUÉS
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const specialtyRoutes = require('./routes/specialties');
const appointmentRoutes = require('./routes/appointments');

app.use('/auth', authRoutes);
app.use('/doctors', doctorRoutes);
app.use('/specialties', specialtyRoutes);
app.use('/appointments', appointmentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'MedAppointments API running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;