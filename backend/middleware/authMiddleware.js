// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1];
    
    // If there's no token, return an error
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user and exclude the password field
        const user = await User.findById(decoded.user.id).select('-password');
        
        // If user not found, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optional: Check if the user's account is active (if you have an "isActive" field)
        // Uncomment if needed
        // if (!user.isActive) {
        //     return res.status(403).json({ message: 'User account is inactive' });
        // }

        // Attach the user object to the request
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Middleware error:', err.message); // Log error message
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
