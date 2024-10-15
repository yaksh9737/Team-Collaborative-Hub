// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, assignRole, getUserInfo, getAllUsers } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/assign-role/:id', authMiddleware, assignRole);
router.get('/user/:id', authMiddleware, getUserInfo);
router.get('/users', authMiddleware, getAllUsers);

module.exports = router;
