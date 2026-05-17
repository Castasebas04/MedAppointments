const express = require('express');
const router = express.Router();
const doctorService = require('../services/doctorService');

// GET /doctors - todos los doctores (filtrable por especialidad)
router.get('/', async (req, res) => {
  try {
    const { specialty_id } = req.query;
    const doctors = await doctorService.getAllDoctors(specialty_id);
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /doctors/:id - un doctor por id
router.get('/:id', async (req, res) => {
  try {
    const doctor = await doctorService.getDoctorById(req.params.id);
    res.status(200).json(doctor);
  } catch (err) {
    if (err.message === 'DOCTOR_NOT_FOUND') {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /doctors/:id/schedules - horarios de un doctor
router.get('/:id/schedules', async (req, res) => {
  try {
    const result = await doctorService.getDoctorSchedules(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'DOCTOR_NOT_FOUND') {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;