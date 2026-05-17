const appointmentRepository = require('../repositories/appointmentRepository');
const doctorRepository = require('../repositories/doctorRepository');

const createAppointment = async (userId, doctorId, date, time, notes) => {
  // Verificar que el doctor existe
  const doctor = await doctorRepository.findById(doctorId);
  if (!doctor) throw new Error('DOCTOR_NOT_FOUND');

  // Verificar que la fecha no sea en el pasado
  const appointmentDate = new Date(`${date}T${time}`);
  if (appointmentDate < new Date()) {
    throw new Error('PAST_DATE');
  }

  // Verificar que el doctor no tenga otra cita en ese horario
  const doctorConflict = await appointmentRepository.findDocConflict(doctorId, date, time);
  if (doctorConflict) throw new Error('DOCTOR_NOT_AVAILABLE');

  // Verificar que el paciente no tenga otra cita en ese horario
  const userConflict = await appointmentRepository.findUserConflict(userId, date, time);
  if (userConflict) throw new Error('USER_HAS_CONFLICT');

  return await appointmentRepository.create(userId, doctorId, date, time, notes);
};

const getUserAppointments = async (userId) => {
  return await appointmentRepository.findByUser(userId);
};

const cancelAppointment = async (appointmentId, userId) => {
  // Verificar que la cita existe
  const appointment = await appointmentRepository.findById(appointmentId);
  if (!appointment) throw new Error('APPOINTMENT_NOT_FOUND');

  // Verificar que la cita pertenece al usuario
  if (appointment.user_id !== userId) {
    throw new Error('UNAUTHORIZED');
  }

  // Verificar que la cita no esté ya cancelada
  if (appointment.status === 'cancelled') {
    throw new Error('ALREADY_CANCELLED');
  }

  return await appointmentRepository.cancel(appointmentId);
};

module.exports = { createAppointment, getUserAppointments, cancelAppointment };