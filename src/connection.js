const { Pool } = require('pg');
require ('dotenv').config();

// Create a connection configuration
const connectionConfig = {
  user: process.env.DB_USER || 'your_username',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'employee_tracker_db',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432
};

// Create a connection pool
const pool = new Pool(connectionConfig);

// Error handling for database connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;