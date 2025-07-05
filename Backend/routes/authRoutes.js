
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const validate = require('../middleware/authMiddleware');

// Customer Registration
router.post('/register', validate.validateRegister, authController.registerCustomer);

// Admin Registration
router.post('/admin-register', validate.validateAdminRegister, authController.registerAdmin);

// Login
router.post('/login', validate.validateLogin, authController.loginUser);

// Get all users
router.get('/all-users', authController.getAllUsers);

// Get user by user_id
router.get('/user/:userId', authController.getUserByUserId);

module.exports = router;
