// DocumentEditor.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./DocumentEditor.css"; // Style as needed

const socket = io("http://localhost:5000");

const DocumentEditor = () => {
    const { projectId } = useParams(); // Get project ID from URL
    const [documentContent, setDocumentContent] = useState("");
    const [documentName, setDocumentName] = useState("Untitled Document");

    useEffect(() => {
        // Fetch document data when component loads
        fetch(`/api/projects/${projectId}/document`)
            .then((response) => response.json())
            .then(({ name, content }) => {
                setDocumentName(name);
                setDocumentContent(content);
            });

        // Connect to real-time socket updates
        socket.emit("joinDocument", projectId);

        socket.on("updateDocument", (content) => {
            setDocumentContent(content);
        });

        return () => {
            socket.emit("leaveDocument", projectId);
            socket.off("updateDocument");
        };
    }, [projectId]);

    const handleContentChange = (e) => {
        setDocumentContent(e.target.value);
        socket.emit("editDocument", { projectId, content: e.target.value });
    };

    const saveDocument = async () => {
        await fetch(`/api/projects/${projectId}/document`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: documentContent }),
        });
        alert("Document saved successfully!");
    };

    return (
        <div className="document-editor">
            <input 
                className="document-title"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                />
            <textarea
                className="document-body"
                value={documentContent}
                onChange={handleContentChange}
                />
            <button className="save-button"
            onClick={saveDocument}>
                Save
            </button>
        </div>
    );
};

export default DocumentEditor;