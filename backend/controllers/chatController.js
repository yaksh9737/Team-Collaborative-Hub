// controllers/chatController.js
const Chat = require('../models/Chat');

// Send Message
exports.sendMessage = async (req, res) => {
    const { project, message } = req.body;
    const userId = req.user.id; // Assuming authentication middleware is used

    try {
        const chat = new Chat({
            project,
            user: userId,
            message
        });

        await chat.save();
        res.status(201).json({ message: 'Message sent successfully', chat });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Messages
exports.getMessages = async (req, res) => {
    const { project } = req.params;

    try {
        const chats = await Chat.find({ project }).populate('user', 'name');
        res.json(chats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
