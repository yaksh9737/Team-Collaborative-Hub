// routes/taskRoutes.js
const express = require('express');
const {
    createTask,
    updateTask,
    deleteTask,
    filterTasks,
    getTaskById,
    getAllTasksForUser,
    updateTaskStatus,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create Task
router.post('/', authMiddleware, createTask);

// Update Task
router.put('/:id', authMiddleware, updateTask);

// Delete Task
router.delete('/:id', authMiddleware, deleteTask);

// Filter Tasks
router.get('/', authMiddleware, filterTasks);

// Get All Tasks for User
router.get('/user', authMiddleware, getAllTasksForUser);

// Get Task by ID
router.get('/:id', authMiddleware, getTaskById);

// Update Task Status
router.put('/status/:id', authMiddleware, updateTaskStatus);

module.exports = router;
