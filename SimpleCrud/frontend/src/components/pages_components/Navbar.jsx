import React from 'react';
import{useState, useEffect} from "react";
import {useNavigate} from "react-router";

export default function Navbar(){
    const [auth, setAuth]=useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(localStorage.getItem("token"));
        setAuth(localStorage.getItem("token"));
    }, [localStorage.getItem('token')])

    const handleExit=()=>{
        localStorage.removeItem("token");
        navigate('/');
    }


    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        {
                            auth !== null?
                                <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/main">Home</a>
                                </li> : null
                        }
                        <li className="nav-item">
                            <a className="nav-link" href="/signup">SignUp</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/signin">SignIn</a>
                        </li>
                        {
                            auth !== null?
                                <li className="nav-item">
                                <a className="nav-link" href="/" onClick={handleExit}>Exit</a>
                                </li> :null
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}