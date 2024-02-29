import React from 'react'
import SignUpPage from "../pages/SignUpPage";
import SingInPage from "../pages/SignInPage";
import NotFoundPage from "../pages/NotFoundPage";
import Tasks from "../task/Tasks";
import MainPage from "../pages/MainPage";
import {Route} from "react-router-dom";
import {Routes} from "react-router";
export default function Content(){
    return(
        <div className="page-content">
                <Routes>
                    <Route path="/" element={<SignUpPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/signin" element={<SingInPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path="/tasks" element={<Tasks/>}/>
                </Routes>
        </div>
    )
}