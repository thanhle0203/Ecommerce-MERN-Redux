const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model

const authenticateUser = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        console.log('Extracted token:', token); // Debugging line

        if (!token) {
            // If no token is found, return 401 Unauthorized
            return res.status(401).json({ message: 'Authentication failed: No token provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Debugging line

        // Find user by ID
        //const user = await User.findById(decoded.id);
        const user = await User.findById(decoded.userId);
        console.log('Found user:', user); // Debugging line

        if (!user) {
            // If user not found, return 401 Unauthorized
            return res.status(401).json({ message: 'Authentication failed: User not found.' });
        }

        console.log('JWT Secret:', process.env.JWT_SECRET); // Debugging line


        // Append user to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle error
        if (error.name === 'JsonWebTokenError') {
            // If JWT verification fails, return 401 Unauthorized
            return res.status(401).json({ message: 'Invalid token.' });
        }
        console.error('Error:', error.message);
        // Otherwise, return 500 Server Error
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = authenticateUser;
