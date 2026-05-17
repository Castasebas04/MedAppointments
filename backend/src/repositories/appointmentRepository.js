const pool = require('../config/database');

const findDocConflict = async (doctorId, date, time) => {
  const result = await pool.query(
    `SELECT * FROM appointments 
     WHERE doctor_id = $1 AND date = $2 AND time = $3 
     AND status = 'scheduled'`,
    [doctorId, date, time]
  );
  return result.rows[0];
};

const findUserConflict = async (userId, date, time) => {
  const result = await pool.query(
    `SELECT * FROM appointments 
     WHERE user_id = $1 AND date = $2 AND time = $3 
     AND status = 'scheduled'`,
    [userId, date, time]
  );
  return result.rows[0];
};

const create = async (userId, doctorId, date, time, notes) => {
  const result = await pool.query(
    `INSERT INTO appointments (user_id, doctor_id, date, time, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, doctorId, date, time, notes]
  );
  return result.rows[0];
};

const findByUser = async (userId) => {
  const result = await pool.query(
    `SELECT a.id, a.date, a.time, a.status, a.notes,
            d.name AS doctor_name, s.name AS specialty
     FROM appointments a
     JOIN doctors d ON a.doctor_id = d.id
     JOIN specialties s ON d.specialty_id = s.id
     WHERE a.user_id = $1
     ORDER BY a.date, a.time`,
    [userId]
  );
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM appointments WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

const cancel = async (id) => {
  const result = await pool.query(
    `UPDATE appointments SET status = 'cancelled' 
     WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

module.exports = { findDocConflict, findUserConflict, create, findByUser, findById, cancel };