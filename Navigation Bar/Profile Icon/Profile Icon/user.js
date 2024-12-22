// server/routes/user.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // User model

// GET user profile
router.get('/profile', async (req, res) => {
    try {
        const userId = req.user.id; // Assumes user ID is available in request
        const user = await User.findById(userId, 'name profilePicture email bio');
        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Error fetching user profile" });
    }
});

module.exports = router;
