const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
    ...config.db,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Successfully connected to Azure PostgreSQL database');
        release();
    }
});

module.exports = pool;