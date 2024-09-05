const express = require('express');
const router = express.Router();
const { login, signup, logout, forgotPassword, resetPassword, setNewPassword } = require('../controllers/auth.controller');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;