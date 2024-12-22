import React, { useState, useEffect } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BsFillGearFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./App.css";

function App() {
    const [menu, setMenu] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null); // Track the selected project

    useEffect(() => {
        // Fetch initial menu items from the backend when the component mounts
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get("/api/menu-items");
                setMenu(response.data);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };
        fetchMenuItems();
    }, []);

    const handleProjectSelection = (id) => {
        setSelectedProjectId(id); // Track selected project ID
    };

    return (
        <div className="app-container">
            <Logo projectId={selectedProjectId} />
            <Tab.Container id="left-tabs-example" defaultActiveKey="none">
                <Row>
                    <Col sm={3} id="sidebar">
                        <div className="sidebar-title">
                            <h4>Person X's Projects</h4>
                        </div>
                        <Nav variant="pills" className="flex-column">
                            {menu.map((item) => (
                                <Nav.Item key={item.id} className="nav-item">
                                    <Nav.Link
                                        eventKey={"content-" + item.id}
                                        className="nav-link"
                                        onClick={() => handleProjectSelection(item.id)}
                                    >
                                        {item.title}
                                    </Nav.Link>
                                    <DropdownButton
                                        key={"settings-" + item.id}
                                        drop="end"
                                        variant="link"
                                        id="settings"
                                        title={<BsFillGearFill />}
                                    >
                                        <Dropdown.Item
                                            eventKey={"edit-" + item.id}
                                            onClick={() => editMenu(item.id)}
                                        >
                                            Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            eventKey={"delete-" + item.id}
                                            className="text-danger"
                                            onClick={() => deleteMenu(item.id)}
                                        >
                                            Delete
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            {menu.map((item) => (
                                <Tab.Pane
                                    eventKey={"content-" + item.id}
                                    key={"content-" + item.id}
                                >
                                    <h5>{item.title}</h5>
                                    <p>{item.content}</p>
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default App;
