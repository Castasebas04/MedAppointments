const pool = require('./database');

const seed = async () => {
  try {
    // Especialidades
    await pool.query(`
      INSERT INTO specialties (name) VALUES
        ('Odontologia'),
        ('Oftalmologia'),
        ('Dermatologia'),
        ('Cardiologia'),
        ('Pediatría')
      ON CONFLICT (name) DO NOTHING
    `);

    // Doctores
    await pool.query(`
      INSERT INTO doctors (name, specialty_id) VALUES
        ('Dr. Carlos Mendez', 1),
        ('Dra. Ana García', 1),
        ('Dr. Luis Pérez', 2),
        ('Dra. María Torres', 2),
        ('Dr. Jorge Ramírez', 3),
        ('Dra. Sofia Núñez', 4),
        ('Dr. Andrés Castro', 5)
    `);

    // Horarios
    await pool.query(`
      INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time) VALUES
        (1, 'Monday', '08:00', '12:00'),
        (1, 'Wednesday', '08:00', '12:00'),
        (2, 'Tuesday', '14:00', '18:00'),
        (2, 'Thursday', '14:00', '18:00'),
        (3, 'Monday', '09:00', '13:00'),
        (3, 'Friday', '09:00', '13:00'),
        (4, 'Wednesday', '14:00', '18:00'),
        (5, 'Tuesday', '08:00', '12:00'),
        (5, 'Thursday', '08:00', '12:00'),
        (6, 'Monday', '10:00', '14:00'),
        (7, 'Friday', '08:00', '16:00')
    `);

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();