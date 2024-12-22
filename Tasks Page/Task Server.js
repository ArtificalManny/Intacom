const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

//MongoDB connection
mongoose.connect("mongodb://localhost:27017/tasksDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Project = require("./models/Project"); //Import the Project model

//Listen for real-time events
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinProject", (projectId) => {
        socket.join(projectId);
        console.log(`User joined project: ${projectId}`);
    });

    socket.on("taskAdded", (projectId, task) => {
        io.to(projectId).emit("taskAdded", task); //Notify other members
    });

    socket.on("taskDeleted", (projectId, task) => {
        io.to(prokectId).emit("taskDeleted", taskId);
    });

    socket.on("taskUpdated", (projectId, updatedTask) => {
        io.to(projectId).emit("taskUpdated", updatedTask);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(5000, () => {
    console.log("Server is running on port 5000");
});