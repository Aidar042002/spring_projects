import React from "react";
import {useNavigate} from "react-router";
import {useState} from "react";

export default function SingInPage(){
    const navigate=useNavigate();

    const [state, setState] = useState({
        username:"",
        password:""
    });

    function fill(e){
        const copy={...state}
        copy[e.target.name]=e.target.value
        setState(copy)
    }

    async function handle(e){
        e.preventDefault();
        localStorage.clear();
        const res=await fetch("http://localhost:8080/auth/signin", {
            method:"post",
            body: JSON.stringify(state),
            headers: {
                "Content-type":"application/json"
            }
        })
        if(res.ok){
            const json=await res.text()
            console.log(json)
            localStorage.setItem("token", json)
            navigate("/main");
        }
    }

    return (
        <div className="padding-minus">
            <form>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Username" onChange={fill}/>
                            <label htmlFor="floatingInput">Enter username</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={fill}/>
                            <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit" onClick={handle}>Sign in</button>
            </form>
        </div>
    )
}


