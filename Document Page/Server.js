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

// Define a Project schema and model
const projectSchema = new mongoose.Schema({
    name: String,
    document: {
        name: String,
        content: String,
    },
});
const Project = mongoose.model("Project", projectSchema);

app.use(bodyParser.json());

// API Route: Get Document
app.get("/api/projects/:projectId/document", async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");
    res.json(project.document || { name: "Untitled Document", content: "" });
});

// API Route: Save Document
app.post("/api/projects/:projectId/document", async (req, res) => {
    const { projectId } = req.params;
    const { content } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send("Project not found");
    project.document.content = content;
    await project.save();
    res.send("Document saved");
});

// Real-time Socket.io Handling
io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("joinDocument", (projectId) => {
        socket.join(projectId);
        console.log(`User joined project ${projectId}`);
    });

    socket.on("editDocument", ({ projectId, content }) => {
        socket.to(projectId).emit("updateDocument", content);
    });

    socket.on("leaveDocument", (projectId) => {
        socket.leave(projectId);
        console.log(`User left project ${projectId}`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
