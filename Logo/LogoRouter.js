const express = require("express");
const router = express.Router();
const Project = require("../models/Project"); //Assuming a 'Project' model

//Fetch project main page detailsd by project ID
router.get("/api/projects/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.status(200).json(project);
    } catch (error) {
        console.error("Error fetchiing project details:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;