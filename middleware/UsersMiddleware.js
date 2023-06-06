const express = require('express');
const app = express();

// Authentication Middleware
const authMiddleware = (req, res, next) => {
    const { username, password } = req.headers;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(401).send('Authentication failed: Username and password are required.');
    }

    // Check if user exists
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).send('Authentication failed: Invalid username or password.');
    }

    // Attach the user object to the request for further use
    req.user = user;

    // Pass control to the next middleware or route handler
    next();
};

// Export of all methods as object
module.exports = {
    authMiddleware
};