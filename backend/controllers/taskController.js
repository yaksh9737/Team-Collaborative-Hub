// controllers/taskController.js
const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    try {
        const task = new Task({
            title,
            description,
            status: status || 'Pending', // Default status if not provided
            priority: priority || 'Medium', // Default priority if not provided
            dueDate,
            assignedTo: assignedTo || [req.user.id], // Assign the current user if none provided
        });

        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Only update fields that are provided
        task.title = title !== undefined ? title : task.title;
        task.description = description !== undefined ? description : task.description;
        task.status = status !== undefined ? status : task.status;
        task.priority = priority !== undefined ? priority : task.priority;
        task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
        task.assignedTo = assignedTo || task.assignedTo; // Update assigned users

        await task.save();
        res.json({ message: 'Task updated successfully', task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if the user is authorized to delete this task
        if (!task.assignedTo.includes(req.user.id)) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }

        // Use findByIdAndDelete to remove the task
        await Task.findByIdAndDelete(id);

        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Filter Tasks
exports.filterTasks = async (req, res) => {
    const { status, priority, assignedTo } = req.query;

    try {
        const filterCriteria = {};
        if (status) filterCriteria.status = status;
        if (priority) filterCriteria.priority = priority;
        if (assignedTo) filterCriteria.assignedTo = assignedTo;

        const tasks = await Task.find(filterCriteria).populate('assignedTo', 'name email'); // Populate user data
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Fetch Task by ID
exports.getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id).populate('assignedTo', 'name email'); // Populate assigned user details
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get All Tasks for User
exports.getAllTasksForUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role; // Assuming role is part of req.user

        console.log('User ID:', userId); // Debugging log for user ID

        let tasks;
        if (userRole === 'Admin') {
            // If the user is an Admin, fetch all tasks
            tasks = await Task.find().populate('assignedTo', 'name email'); // Populate assigned user details
        } else {
            // If the user is a regular User, fetch only their tasks
            tasks = await Task.find({ assignedTo: userId }).populate('assignedTo', 'name email'); // Populate assigned user details
        }

        console.log('Fetched Tasks:', tasks); // Log fetched tasks
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update Task Status
exports.updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.status = status;
        await task.save();
        res.json({ message: 'Task status updated successfully', task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
