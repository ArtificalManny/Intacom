// Backend code - e.g., Express.js with Firebase setup
const express = require("express");
const admin = require("firebase-admin");
const app = express();

// Initialize Firebase Admin for FCM (Firebase Cloud Messaging)
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

app.use(express.json());

// In-memory store for notifications (replace with database for production)
let notificationsStore = {};

// Endpoint to fetch notifications
app.get("/getNotifications", (req, res) => {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ error: "Missing user ID" });
    const notifications = notificationsStore[uid] || [];
    res.json({ notifications });
});

// Function to add notification
const addNotification = (uid, notification) => {
    if (!notificationsStore[uid]) notificationsStore[uid] = [];
    notificationsStore[uid].unshift(notification); // Add new notification to the beginning of the array
};

// Real-time notification handler (using WebSocket)
const setupWebSocket = (server) => {
    const WebSocket = require("ws");
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        ws.on("message", (message) => {
            const { uid, notification } = JSON.parse(message);
            addNotification(uid, notification);
            // Broadcast to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(notification));
                }
            });
        });
    });
};

module.exports = { app, setupWebSocket };
