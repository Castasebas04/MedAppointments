const express = require('express');
const router = express.Router();
const appointmentService = require('../services/appointmentService');
const authenticate = require('../middlewares/auth');

// POST /appointments - agendar cita (requiere auth)
router.post('/', authenticate, async (req, res) => {
  try {
    const { doctor_id, date, time, notes } = req.body;

    if (!doctor_id || !date || !time) {
      return res.status(400).json({ error: 'doctor_id, date and time are required' });
    }

    const appointment = await appointmentService.createAppointment(
      req.user.id,
      doctor_id,
      date,
      time,
      notes
    );

    res.status(201).json(appointment);
  } catch (err) {
    console.error('Appointment error', err);
    if (err.message === 'DOCTOR_NOT_FOUND') {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    if (err.message === 'PAST_DATE') {
      return res.status(400).json({ error: 'Cannot schedule appointments in the past' });
    }
    if (err.message === 'DOCTOR_NOT_AVAILABLE') {
      return res.status(409).json({ error: 'Doctor already has an appointment at that time' });
    }
    if (err.message === 'USER_HAS_CONFLICT') {
      return res.status(409).json({ error: 'You already have an appointment at that time' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /appointments/me - ver mis citas (requiere auth)
router.get('/me', authenticate, async (req, res) => {
  try {
    const appointments = await appointmentService.getUserAppointments(req.user.id);
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /appointments/:id - cancelar cita (requiere auth)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const appointment = await appointmentService.cancelAppointment(
      parseInt(req.params.id),
      req.user.id
    );
    res.status(200).json(appointment);
  } catch (err) {
    if (err.message === 'APPOINTMENT_NOT_FOUND') {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    if (err.message === 'UNAUTHORIZED') {
      return res.status(403).json({ error: 'You can only cancel your own appointments' });
    }
    if (err.message === 'ALREADY_CANCELLED') {
      return res.status(409).json({ error: 'Appointment is already cancelled' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;