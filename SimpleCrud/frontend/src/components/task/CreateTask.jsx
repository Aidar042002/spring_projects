import React, {useState} from "react";
import {useNavigate} from "react-router";

export default function CreateTask(){

    const [data, setData] = useState({
        title: "",
        description: "",
        count: null
    });

    const navigate = useNavigate();

    async function addTask(e){
        e.preventDefault();
        const token=localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/secured/task", {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });
        if (res.ok) {
            navigate("/tasks");
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

    return(
        <div>
            <form>
                <h1 className="h3 mb-3 fw-normal">Enter new task</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="title" name="title" placeholder="Title" onChange={fill}/>
                    <label htmlFor="title">Title</label>
                </div>

                <div className="form-floating">
                    <textarea className="form-control" id="description" name="description" placeholder="Description" onChange={fill}/>
                    <label htmlFor="description">Description</label>
                </div>

                <div className="form-floating">
                    <input type="number" className="form-control" id="count" name="count" placeholder="Priority" onChange={fill}/>
                    <label htmlFor="priority">Priority</label>
                </div>


                <button className="btn btn-primary w-100 py-2" style={{marginTop:"5px"}} type="submit" onClick={addTask}>Добавить</button>
            </form>
        </div>
    );
}