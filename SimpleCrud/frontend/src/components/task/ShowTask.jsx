import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ShowTask() {
    const [task, setTask] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        const fetchTask = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/secured/task/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTask(data);
        };

        fetchTask();
    }, [id]);

    return (
        <div>
            <h1>Task</h1>
            <div>
                <strong>Title:</strong> {task.title}
            </div>
            <div>
                <strong>Description:</strong> {task.description}
            </div>
            <div>
                <strong>Priority:</strong> {task.count}
            </div>
        </div>
    )
}