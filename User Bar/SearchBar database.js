// server/models/Project.js

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    owner: String,
    created_at: { type: Date, default: Date.now },
    // Any additional fields as needed
});

module.exports = mongoose.model('Project', ProjectSchema);
