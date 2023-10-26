import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify"; import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";


import { setAvatarRoute } from "../utils/ApiRoutes";
import axios from "axios";
export default function SetAvatar() {
    const navigate = useNavigate();
    const toastoptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const [avatar, setavatar] = useState([])
    const [load, setload] = useState(true)
    const [chosen, setchosen] = useState(undefined)
    const api = "https://api.multiavatar.com/45678945";
    const setProfilePic = async () => {
        if (chosen==undefined) {
            toast.error("Please Select An Avatar", toastoptions)
        }
        else{
            const user = await JSON.parse(localStorage.getItem('chat-app-user'))
            const {data} =  await axios.post(`${setAvatarRoute}/${user._id}`,{
                image: avatar[chosen],
            })
            console.log(data.isSet);
            if(data.isSet){
                user.isAvatarSet=true;
                user.Avatar=data.image;
                localStorage.setItem('chat-app-user',JSON.stringify(user))
                navigate('/')
            }
            else{
                toast.error("Error Setting Avatar",toastoptions)
            }
        }
        }
    const getAva = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString('base64'));
            setavatar(data);
        }
        setload(false);
    }
    useEffect(() => {
        if(!localStorage.getItem('chat-app-user')){
            navigate('/signin');
        }
        if(JSON.parse(localStorage.getItem('chat-app-user')).isAvatarSet){
            navigate('/');
        }
        getAva()
    }, [])
    return (
        <>
            {
                load?<div className="container">
                    <img className="loader" src={loader} alt="loader" />
                </div>:
            <div className="container">
                <div className="titleCon">
                    <h1>Pick An Avatar As Your Profile Picture</h1>
                </div>
                <div className="avatars">
                    {avatar.map((ava, i) => {
                        return <div key={i} className={`Avatar ${chosen === i ? "selected" : ""} `}>
                            <img src={`data:image/svg+xml;base64,${ava}`} alt="Avatar" onClick={() => { setchosen(i) }} />
                        </div>
                    })}
                </div>
                <button className="submit sbt" onClick={setProfilePic}>Set As Profile Picture</button>
            </div>
        }
            <ToastContainer />
        </>
        )
    }