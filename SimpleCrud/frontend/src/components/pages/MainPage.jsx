import React, {useState, useEffect} from 'react'

export default function MainPage(){
    const[userName, setUserName]=useState("");
    const [item, setItem]=useState("");

    useEffect(()=>{
        setItem(localStorage.getItem("token"))
        fetchContent()
    }, [])

    async function fetchContent(){
        const res=await fetch("http://localhost:8080/secured/user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+ localStorage.getItem("token")
            }
        })

        if(res.ok){
            const json=await res.text()
            setUserName(json)
        }
    }


    return(
        <div>
            {
                item !== null ?
                    <p>Signed up user:{userName}</p>:
                    <p>UNAUTH</p>
            }
            <div className="hello-text">
                Главная страница
                <br/>
                <a href="/tasks">Перейти к задачам</a>
            </div>
        </div>
    )
}