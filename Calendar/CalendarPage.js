import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage = ({ projectId }) => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        type: 'Reminder', // Default type
        likes: 0,
        comments: [],
    });

    // Fetch events for the project
    useEffect(() => {
        axios.get(`/api/projects/${projectId}/calendar`).then((res) => {
            setEvents(res.data);
        });
    }, [projectId]);

    const handleAddEvent = async () => {
        try {
            const res = await axios.post(`/api/projects/${projectId}/calendar`, newEvent);
            setEvents([...events, res.data]);
            setShowEventModal(false);
            setNewEvent({ title: '', start: '', end: '', type: 'Reminder', likes: 0, comments: [] });
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleLike = async (eventId) => {
        try {
            const res = await axios.post(`/api/projects/${projectId}/calendar/${eventId}/like`);
            setEvents(events.map((event) => (event._id === eventId ? res.data : event)));
        } catch (error) {
            console.error('Error liking event:', error);
        }
    };

    const handleAddComment = async (eventId, comment) => {
        try {
            const res = await axios.post(`/api/projects/${projectId}/calendar/${eventId}/comment`, {
                comment,
            });
            setEvents(events.map((event) => (event._id === eventId ? res.data : event)));
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    return (
        <div className="container mt-4">
            <h2>Shared Calendar</h2>
            <Button className="mb-3" onClick={() => setShowEventModal(true)}>
                Add Event
            </Button>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={handleSelectEvent}
            />

            {/* Add/Edit Event Modal */}
            <Modal show={showEventModal} onHide={() => setShowEventModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Event Title"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Start</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={newEvent.start}
                                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={newEvent.end}
                                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={newEvent.type}
                                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                            >
                                <option>Reminder</option>
                                <option>Timeline</option>
                                <option>Deadline</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEventModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddEvent}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Event Details */}
            {selectedEvent && (
                <Modal show={!!selectedEvent} onHide={() => setSelectedEvent(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedEvent.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Type:</strong> {selectedEvent.type}</p>
                        <p><strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
                        <p><strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
                        <p><strong>Likes:</strong> {selectedEvent.likes}</p>
                        <ListGroup>
                            {selectedEvent.comments.map((comment, idx) => (
                                <ListGroup.Item key={idx}>{comment}</ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const comment = e.target.comment.value;
                                handleAddComment(selectedEvent._id, comment);
                                e.target.reset();
                            }}
                        >
                            <Form.Control name="comment" placeholder="Add a comment" />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => handleLike(selectedEvent._id)}>
                            Like
                        </Button>
                        <Button variant="secondary" onClick={() => setSelectedEvent(null)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default CalendarPage;
