import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaTimes, FaPalette, FaTasks, FaChartLine, FaFileAlt, FaTable, FaStickyNote, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

function NewProjectModal({ show, onClose }) {
    const [projectName, setProjectName] = useState('');
    const [projectColor, setProjectColor] = useState('#3498db'); // default color
    const [selectedFeatures, setSelectedFeatures] = useState(['Tasks']);
    const [emailInvites, setEmailInvites] = useState('');
    const [selectedColor, setSelectedColor] = useState('#3498db');

    // Added 'Schedule' to features
    const features = [
        { name: 'Tasks', icon: <FaTasks /> },
        { name: 'Activity Graph', icon: <FaChartLine /> },
        { name: 'Documents', icon: <FaFileAlt /> },
        { name: 'Spreadsheets', icon: <FaTable /> },
        { name: 'Notes', icon: <FaStickyNote /> },
        { name: 'Schedule', icon: <FaCalendarAlt /> }, // New Schedule Feature
    ];

    const handleFeatureToggle = (feature) => {
        setSelectedFeatures((prevFeatures) =>
            prevFeatures.includes(feature)
                ? prevFeatures.filter((f) => f !== feature)
                : [...prevFeatures, feature]
        );
    };

    const handleDone = async () => {
        try {
            const projectData = {
                name: projectName,
                color: projectColor,
                features: selectedFeatures,
                invites: emailInvites.split(',').map((email) => email.trim()),
            };
            await axios.post('/api/projects', projectData);
            onClose();
            // Reset state after submission
            setProjectName('');
            setProjectColor('#3498db');
            setSelectedFeatures(['Tasks']);
            setEmailInvites('');
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>New Project</Modal.Title>
                <FaTimes onClick={onClose} style={{ cursor: 'pointer' }} />
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="projectName" className="d-flex align-items-center mb-3">
                        <FaPalette
                            style={{
                                fontSize: '1.5em',
                                color: projectColor,
                                cursor: 'pointer',
                                marginRight: '1em',
                            }}
                            onClick={() =>
                                setProjectColor(prompt('Enter color (hex or name):') || projectColor)
                            }
                        />
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter project name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Label>Choose Features</Form.Label>
                    <Row className="mb-3">
                        {features.map((feature, idx) => (
                            <Col
                                xs={6}
                                className="d-flex justify-content-center align-items-center mb-3"
                                key={idx}
                            >
                                <Button
                                    variant={selectedFeatures.includes(feature.name) ? 'primary' : 'outline-primary'}
                                    onClick={() => handleFeatureToggle(feature.name)}
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    {feature.icon} {feature.name}
                                </Button>
                            </Col>
                        ))}
                    </Row>

                    <Form.Group controlId="projectMembers">
                        <Form.Label>Project Members</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Add emails (comma-separated)"
                            value={emailInvites}
                            onChange={(e) => setEmailInvites(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            Share access via email addresses (like Google Docs).
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleDone}>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewProjectModal;
