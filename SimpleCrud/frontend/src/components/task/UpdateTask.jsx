import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export default function UpdateTask() {
    const navigate = useNavigate();
    const { id } = useParams(); // Получаем ID задачи из URL
    const [data, setData] = useState({
        title: "",
        description: "",
        count: 0
    });

    useEffect(() => {
        // Функция для загрузки данных задачи для обновления
        async function fetchTask() {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8080/secured/task/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const taskData = await response.json();
                setData({
                    title: taskData.title,
                    description: taskData.description,
                    count: taskData.count
                });
            } catch (error) {
                console.error("Error fetching task:", error);
            }
        }

        fetchTask();
    }, [id]);

    async function updateTask(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8080/secured/task/${id}`, {
            method: "PUT", // Изменено на PUT для обновления задачи
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        if (res.ok) {
            navigate("/tasks", { replace: true }); // Перенаправление на страницу задач
        } else {
            const errorMessage = await res.text();
            alert(`Error: ${errorMessage}`);
        }
    }

    function fill(e) {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div>
            <form>
                <h1 className="h3 mb-3 fw-normal">Update Task</h1>

                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={data.title}
                        onChange={fill}
                    />
                    <label htmlFor="title">Title</label>
                </div>

                <div className="form-floating">
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={data.description}
                        onChange={fill}
                    />
                    <label htmlFor="description">Description</label>
                </div>

                <div className="form-floating">
                    <input
                        type="number"
                        className="form-control"
                        id="count"
                        name="count"
                        placeholder="Priority"
                        value={data.count}
                        onChange={fill}
                    />
                    <label htmlFor="priority">Priority</label>
                </div>

                <button
                    className="btn btn-primary w-100 py-2"
                    style={{ marginTop: "5px" }}
                    type="submit"
                    onClick={updateTask}
                >
                    Update Task
                </button>
            </form>
        </div>
    );
}
