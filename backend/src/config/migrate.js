const fs = require('fs');
const path = require('path');
const pool = require('./database');

const migrate = async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(sql);
    console.log('Tables created successfully');
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
};

migrate();