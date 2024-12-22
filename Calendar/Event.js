// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    type: { type: String, required: true }, ///Reminder, Timeline, Deadline
    likes: { type: Number, default: 0},
    comments: { type: [String], default: [] },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});

module.exports = mongoose.model('Event', eventSchema);