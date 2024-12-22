const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/projectsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the Project schema
const projectSchema = new mongoose.Schema({
    name: String,
    members: [String], // List of emails
    spreadsheet: [[String]],
});
const Project = mongoose.model("Project", projectSchema);

app.use(bodyParser.json());

// API Route: Get Spreadsheet Data
app.get("/api/projects/:projectId/spreadsheet", async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");
    res.json(project.spreadsheet || [[]]);
});

// API Route: Save Spreadsheet Data
app.post("/api/projects/:projectId/spreadsheet", async (req, res) => {
    const { projectId } = req.params;
    const { data } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");

    project.spreadsheet = data;
    await project.save();

    res.send("Spreadsheet saved");
});

// Real-time Socket.io Handling
io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("joinSpreadsheet", (projectId) => {
        socket.join(projectId);
        console.log(`User joined spreadsheet ${projectId}`);
    });

    socket.on("editSpreadsheet", ({ projectId, data }) => {
        socket.to(projectId).emit("updateSpreadsheet", data);
    });

    socket.on("leaveSpreadsheet", (projectId) => {
        socket.leave(projectId);
        console.log(`User left spreadsheet ${projectId}`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
