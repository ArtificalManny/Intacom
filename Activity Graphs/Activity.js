//models/Activity.js
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema ({
    type: { type: String, required: true }, //e.g., "Project Created", "Task Added"
    details: { type: String, required: true }, //Detailed description
    projectId: { type: String, required: false }, //Related project ID (if any)
    userId: { type: String, required: true }, //ID of the user who performed the action
    timestampt: { type:Date, default: Date.now }, //Time of the activity
});

module.exports = mongoose.model("Activity", activitySchema);