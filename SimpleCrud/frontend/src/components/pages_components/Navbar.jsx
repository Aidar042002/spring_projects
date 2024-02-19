import React from 'react'

export default function Navbar(){
    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">

                <div className="collapse navbar-collapse" id="navbarsExample02">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/main">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/signup">SignUp</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/signin">SignIn</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}