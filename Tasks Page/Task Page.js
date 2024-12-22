import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
    Container,
    Row,
    Col,
    Button,
    InputGroup,
    FormControl,
    ListGroup,
} from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const TasksPage = () => {
    const { projectId } = useParams(); //Retrieve the project ID from the URL
    const [userInput, setUserInput] = useState("");
    const [tasks, setTasks] = useState([]);

    //Fetch tasks on component mount
    useEffect (() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`/api/projects/${projectId}/tasks`);
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [projectId]);

    //Add a task
    const addTask = async ( => {
        if (userInput.trim() === "") return;

        try{
            const response = await axios.post(`/api/projects/${projectId}/tasks`, {
                value: userInput,
            });
            setTasks ((prevTasks) => [...prevTasks, response.data]);
            setUserInput("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    })
};

//Delete a task 
const deleteTask = async (taskId) => {
    try {
        await axios.delete(`/api/projects/${projectId}/tasks/${tasksId}`);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};

//Edit a task
const editTask = async (taskId) => {
    const newTaskValue = prompt("Edit task:");
    if (!newTaskValue || newTaskValue.trim() === "") return;

    try {
        const response = await axios.put(`/api/projects/${projectId}/tasks/${tasksId}`, {
            value: newTaskValue,
        });
        setTasks((prevTasks) => 
    prevTasksTasks.map((task) => (task.id === taskId ? response.data : task))
);
    } catch (error) {
        console.error("Error updating task:", error);
    };

    return (
        <Container>
            <Row className="text-center my-4">
                <<h1>Tasks for {projectId}</h1>
            </Row>
            <Row className="mb-4">
                <Col md={{ span: 5, offset: 4 }}>
                    <InputGroup>
                    <FormControl
                        placeholder="Add a task"
                        size="lg"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        />
                        <Button variant="dark" onClick={addTask}>
                            Add
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 5, offset: 4}}>
                    <ListGroup>
                        {tasks.map((task) => (
                            <ListGroup.Item
                            key={task.id}
                            className="d-flex justify-content-between align-tems-center"
                            >
                                {task.value}
                                <div>
                                    <Button 
                                    variant = "light"
                                    onClick={() => editTask(task.id)}
                                    style={{ marginRight: "10px"}}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                    variant="light"
                                    onClick={() => deleteTask(task.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export defaultTaskPage;