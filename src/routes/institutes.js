// src/routes/institutes.js

const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // Use the database pool configured earlier

// Route to get all institutes
router.get('/institutes', async (req, res) => {
    try {
        const result = await pool.query('SELECT id,institute_name FROM "user"."Master_Institute"');
        res.json(result.rows);  // Return the data as JSON
    } catch (err) {
        console.error('Error fetching institutes:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
