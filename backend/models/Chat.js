// models/Chat.js
const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    project: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);
