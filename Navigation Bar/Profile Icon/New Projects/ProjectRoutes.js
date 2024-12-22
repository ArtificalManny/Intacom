// routes/projectRoutes.js
const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

//Create a new project
router.post('/projects', async (req, res) => {
    const { name, color, feautres, invites } = req.body;

    try {
        const newProject = new Project ({ name, color, features, invites });
        await newProject.save();
        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
        console.error('Error create project:', error);
        res.status(500).json({ error: 'Failed to create project'});
    }
});

module.exports = router;