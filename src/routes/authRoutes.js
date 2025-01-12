// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { validateSignupRequest, validateLoginRequest } = require('../middleware/validateRequest');

router.post('/signup', validateSignupRequest, signup);
router.post('/login', validateLoginRequest, login);

module.exports = router;
