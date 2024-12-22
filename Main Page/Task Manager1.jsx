import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [taskList, setTaskList] = useState([
        { id: 1, value: 'Task 1', subtasks: [] },
        { id: 2, value: 'Task 2', subtasks: [] },
        { id: 3, value: 'Task 3', subtasks: [] },
    ]);
    const [checkedList, setCheckedList] = useState([]);

    // Handle task completion
    const handleSelect = (event, taskId, subtaskId = null) => {
        const task = taskList.find((t) => t.id === taskId);
        const value = subtaskId
            ? `${task.value} - ${task.subtasks.find((s) => s.id === subtaskId).value}`
            : task.value;
        
        const isChecked = event.target.checked;

        if (isChecked) {
            setCheckedList((prevCheckedList) => [...prevCheckedList, value]);
        } else {
            setCheckedList((prevCheckedList) => prevCheckedList.filter((item) => item !== value));
        }
    };

    // Add new task
    const addTask = () => {
        const newTaskId = taskList.length + 1;
        setTaskList([...taskList, { id: newTaskId, value: `Task ${newTaskId}`, subtasks: [] }]);
    };

    // Add new subtask
    const addSubtask = (taskId) => {
        setTaskList((prevTaskList) =>
            prevTaskList.map((task) => {
                if (task.id === taskId) {
                    const newSubtaskId = task.subtasks.length + 1;
                    return { ...task, subtasks: [...task.subtasks, { id: newSubtaskId, value: `Subtask ${newSubtaskId}` }] };
                }
                return task;
            })
        );
    };

    // Edit task or subtask value
    const handleEdit = (event, taskId, subtaskId = null) => {
        const updatedTasks = taskList.map((task) => {
            if (task.id === taskId) {
                if (subtaskId) {
                    const updatedSubtasks = task.subtasks.map((subtask) =>
                        subtask.id === subtaskId ? { ...subtask, value: event.target.value } : subtask
                    );
                    return { ...task, subtasks: updatedSubtasks };
                }
                return { ...task, value: event.target.value };
            }
            return task;
        });
        setTaskList(updatedTasks);
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <p className="title">Your Selected Items</p>
                </div>

                <div className="list-container">
                    <label>You Selected:</label>
                    {checkedList.map((item, index) => (
                        <div className="chip" key={index}>
                            <p className="chip-label">{item}</p>
                        </div>
                    ))}
                </div>

                <div className="card-body">
                    {taskList.map((task) => (
                        <div key={task.id} className="task-container">
                            <input
                                type="text"
                                value={task.value}
                                onChange={(e) => handleEdit(e, task.id)}
                                className="task-input"
                            />
                            <input
                                type="checkbox"
                                id={`task-${task.id}`}
                                onChange={(e) => handleSelect(e, task.id)}
                                checked={checkedList.includes(task.value)}
                            />
                            <label htmlFor={`task-${task.id}`}>Mark Complete</label>

                            {/* Display Subtasks */}
                            {task.subtasks.map((subtask) => (
                                <div key={`${task.id}-${subtask.id}`} className="subtask-container">
                                    <input
                                        type="text"
                                        value={subtask.value}
                                        onChange={(e) => handleEdit(e, task.id, subtask.id)}
                                        className="subtask-input"
                                    />
                                    <input
                                        type="checkbox"
                                        id={`subtask-${task.id}-${subtask.id}`}
                                        onChange={(e) => handleSelect(e, task.id, subtask.id)}
                                        checked={checkedList.includes(`${task.value} - ${subtask.value}`)}
                                    />
                                    <label htmlFor={`subtask-${task.id}-${subtask.id}`}>Mark Subtask Complete</label>
                                </div>
                            ))}

                            {/* Add Subtask Button */}
                            <button onClick={() => addSubtask(task.id)}>Add Subtask</button>
                        </div>
                    ))}

                    {/* Add Task Button */}
                    <button onClick={addTask}>Add Task</button>
                </div>
            </div>
        </div>
    );
};

export default App;
