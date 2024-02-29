import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8080/secured/task', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);


    const deleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/secured/task/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
        } catch (error) {
            console.error(`Error deleting task with ID ${taskId}:`, error);
        }
    };

    return (
        <div>
            <h1>Tasks</h1>
            <table className="tasks-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.count}</td>
                        <td>
                            <Link to={`/tasks/${task.id}`} className="btn btn-success">Show</Link>
                            <Link to={`/update/${task.id}`} className="btn btn-primary">Update</Link>
                            <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{textAlign:"center", padding:"5px"}}>
                <a className="btn btn-success" href="/create">Добавить задачу</a>
            </div>
        </div>
    );
}
