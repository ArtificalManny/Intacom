// models/Project.js
const mongoose = require('mongoose');

//Define the schema for the project
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    features: { type: [String], required: true }, //Features like Tasks, Schedule, etc.
    invites: { type: [String], default: [] } //Email invites
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);