// src/components/NotificationBell.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { firebaseApp } from "../firebase"; // Firebase for auth and messaging
import axios from "axios";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [hasNewNotification, setHasNewNotification] = useState(false);
    const navigate = useNavigate();
    const uid = firebaseApp.auth().currentUser?.uid;

    useEffect(() => {
        // Set up a WebSocket or Firebase listener to receive real-time notifications
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`YOUR_FUNCTIONS_URL/getNotifications?uid=${uid}`);
                setNotifications(response.data.notifications);
                setHasNewNotification(response.data.notifications.length > 0);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        // Listen for new notifications using WebSocket or FCM
        const setupRealTimeListener = () => {
            const socket = new WebSocket("wss://YOUR_WEBSOCKET_URL");

            socket.onmessage = (event) => {
                const newNotification = JSON.parse(event.data);
                setNotifications((prev) => [newNotification, ...prev]);
                setHasNewNotification(true);
            };

            return () => socket.close();
        };

        fetchNotifications();
        const cleanupWebSocket = setupRealTimeListener();

        return () => {
            if (cleanupWebSocket) cleanupWebSocket();
        };
    }, [uid]);

    const handleClick = () => {
        navigate("/notifications");
        setHasNewNotification(false);
    };

    return (
        <div
            style={{ position: "fixed", top: "15px", right: "75px", cursor: "pointer" }}
            onClick={handleClick}
            title="Notifications"
        >
            <FaBell size={24} style={{ color: hasNewNotification ? "red" : "gray" }} />
            {hasNewNotification && (
                <span
                    style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "3px 7px",
                        fontSize: "12px",
                    }}
                >
                    {notifications.length}
                </span>
            )}
        </div>
    );
};

export default NotificationBell;
