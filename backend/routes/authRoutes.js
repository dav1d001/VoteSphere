const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken'); // Token verification middleware

// Route for user registration
router.post('/register', authController.registerUser);

// Protected route for admin registration (only accessible to admins)
router.post('/register-admin', verifyToken, authController.registerAdmin);

// Route for user login
router.post('/login', authController.loginUser);

// Route to fetch user details (protected)
router.get('/user', verifyToken, authController.getUserDetails);

// Route for user logout
router.post('/logout', authController.logoutUser);

// Add this route for profile updates
router.post('/update-profile', verifyToken, authController.updateProfile);

// Route to update profile
router.put('/update-profile', verifyToken, authController.updateProfile);

module.exports = router;
