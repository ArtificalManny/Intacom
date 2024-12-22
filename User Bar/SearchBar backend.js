// server/routes/search.js

const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // Import your Project model

// Search endpoint
router.get('/search', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: "Missing search query" });
    }

    try {
        // Search for projects where the name matches the search query
        const results = await Project.find({
            name: { $regex: query, $options: 'i' } // 'i' makes it case-insensitive
        }).limit(10); // Limit results for performance

        res.json({ results });
    } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
