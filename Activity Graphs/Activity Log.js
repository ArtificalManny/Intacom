import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import { Container, Row, Col, Form } from "react-bootstrap";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const ActivityLogPage = () => {
    const [activites, setActivities] = useState([]);
    const [filter, setFilter] = useState(""); //Filter for user or project

    useEffect(() => {
        //Fetch initial activities from the backend
        const fetchActivities = async () => {
            try {
                const response = await.axios.get("/api/activities");
                setActivities(respoonse.data);
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };
        fetchActivities();

        //Listen for new activities via WebSocket
        socket.on("new-activity", (newActivity) => {
            setActivities((prevActivities));
        });

        return () => {
            socket.off("new-activity");
        };
    }, []);

    //Filetered activities
    const filteredActivities = activities.filter(
        (activity) =>
        activity.type.toLowerCase().includes(filter.toLowerCase()) ||
        actiuvity.details.toLowerCase().includes(filter.toLowerCase ())
    );

    //Prepare data for charts
    const activityTypes = filteredActivities.reduce((acc, activity) => {
        acc[activity.type] = (acc[activity.type] || 0) +1;
        return acc;
    }, {});

        const labels = Object.keys(activityTypes);
        const dataCounts = Object.values(activityTypes);

        const chartData = {
            labels,
            datasets: [
                {
                    label: "Activity Count",
                    data: dataCounts,
                    backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    ],
                    borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        return (
            <Container>
                <Row className="text-center my-4">
                    <h1>Activity Log</h1>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Control
                        type="text"
                        placeholder="Filter by activity type or details..."
                        value={filter}
                        onChange={(e) => 
                        setFilter(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="mb-4">
                        <h4>Bar Chart</h4>
                        <Bar data={chartData}/>
                    </Col>
                    <Col md={6} className="mb-4">
                        <h4>Pie Chart</h4>
                        <Pie data={chartData}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="mb-4">
                        <h4>Line Chart</h4>
                        <Line data={chartData} />
                    </Col>
                    <Col md={6} className="mb-4">
                        <h4>Dougnut Chart</h4>
                        <Doughnut data={chartData} />
                    </Col>
                </Row>
            </Container>
        );
};

export default ActivityLogPage;