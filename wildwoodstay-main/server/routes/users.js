const express = require('express');
const router = express.Router();
const {
  updateProfile,
  getProfile,
  changePassword,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;
