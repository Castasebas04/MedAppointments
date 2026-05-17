const doctorRepository = require('../repositories/doctorRepository');

const getAllDoctors = async (specialtyId) => {
  return await doctorRepository.findAll(specialtyId);
};

const getDoctorById = async (id) => {
  const doctor = await doctorRepository.findById(id);
  if (!doctor) throw new Error('DOCTOR_NOT_FOUND');
  return doctor;
};

const getDoctorSchedules = async (doctorId) => {
  const doctor = await doctorRepository.findById(doctorId);
  if (!doctor) throw new Error('DOCTOR_NOT_FOUND');
  const schedules = await doctorRepository.findSchedules(doctorId);
  return { doctor, schedules };
};

module.exports = { getAllDoctors, getDoctorById, getDoctorSchedules };