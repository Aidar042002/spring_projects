import React, {useState} from "react";
import {useNavigate} from "react-router";

export default function SignUpPage(){
    const [state, setState] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    async function handle(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:8080/auth/signup", {
            method: "post",
            body: JSON.stringify(state),
            headers: {
                "Content-type": "application/json"
            }
        });
        if (res.ok) {
            navigate("/signin");
        } else {
            const errorMessage = await res.text();
            alert(`Error: ${errorMessage}`);
        }
    }

    function fill(event) {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return(
        <div className="padding-minus">
            <form>
                <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="username" name="username" placeholder="Username" onChange={fill}/>
                    <label htmlFor="floatingUsername">Username</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" onChange={fill}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={fill}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit" onClick={handle}>Sign up</button>
            </form>
        </div>
    )
}