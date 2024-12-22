import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { HotTable } from "@handsontable/react";
import { io } from "socket.io-client";
import "handsontable/dist/handsontable.full.min.css";

const socket = io("http://localhost:5000");

const SpreadsheetPage = () => {
    const { projectId } = useParams(); // Get project ID from URL
    const [spreadsheetData, setSpreadsheetData] = useState([[]]);
    const spreadsheetRef = useRef(null);

    useEffect(() => {
        // Fetch initial spreadsheet data
        fetch(`/api/projects/${projectId}/spreadsheet`)
            .then((response) => response.json())
            .then((data) => {
                setSpreadsheetData(data);
            });

        // Listen for real-time updates
        socket.emit("joinSpreadsheet", projectId);
        socket.on("updateSpreadsheet", (data) => {
            setSpreadsheetData(data);
        });

        return () => {
            socket.emit("leaveSpreadsheet", projectId);
            socket.off("updateSpreadsheet");
        };
    }, [projectId]);

    const handleDataChange = (changes, source) => {
        if (source === "loadData") return; //Prevent triggering on initial load

        const updatedData = spreadsheetRef.current.hotInstance.getData();
        setSpreadsheetData(updatedData);

        //Send updates to the server
        socket.emit("editSpreadsheet", { projectId, data: updatedData });
    };

    const saveSpreadsheet = async () => {
        await fetch (`/api/projects/${projectId}/spreadsheet`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: spreadsheetData }),
        });
        alert("Spreadsheet saved successfully!");
    };

    return (
        <div className="spreadsheet-container">
            <HotTable
            ref={spreadsheetRef}
            data={spreadsheetData}
            colHeaders={true}
            rowHeaders= {true}
            width= "100%"
            height="500px"
            stretchH="all"
            afterChange={handleDataChange}
            licenseKey="non-commercial-and-evaluation"
            />
            <button className="save-button"
            onClick={saveSpreadsheet}>
                Save Spreadsheet
            </button>
        </div>
    );
};

export default SpreadsheetPage