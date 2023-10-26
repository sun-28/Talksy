import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { SignUpRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import logo from "../assets/NameLogo.png"
export default function SignUp() {
    useEffect(() => {
        if(localStorage.getItem("chat-app-user")){
           navigate('/');
        }
       }, [])
    const toastoptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    let navigate = useNavigate();
    const [cred, setcred] = useState({ name: "", semail: "", spassword: "", repassword: "" })
    const onchange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value });
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (cred.spassword === cred.repassword) {

            const creds = { name: cred.name, email: cred.semail, password: cred.spassword }
            const {data} = await axios.post(SignUpRoute,{
                email:cred.semail,
                name: cred.name,
                password: cred.spassword,
            })
            if (data.success) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate('/setavatar');
            }
            else {
                toast.error(data.error, toastoptions);
            }
        }
        else {
            toast.error("Password Doesn't Match", toastoptions);
        }
    }
    return (
        <div className='formContainer'>
            <div className="form" onSubmit={handlesubmit}>
               <div className='logo-wel'>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                <div className="title">Welcome</div>
                <div className="subtitle">Let's create your account!</div>
                </div>
                <div className="logo-img">
                    <img src={logo} alt="" />
                </div>
                </div>
                <div className="input-container ic1">
                    <input placeholder="Username" type="text" className="input" id="name" name='name' onChange={onchange} value={cred.name} />
                    <div className="cut"></div>
                    <label className="iLabel" htmlFor="username">Username</label>
                </div>

                <div className="input-container ic2">
                    <input placeholder="Email" type="email" className="input" name='semail' onChange={onchange} value={cred.semail} id="semail" />
                    <div className="cut"></div>
                    <label className="iLabel" htmlFor="lastname">Email</label>
                </div>
                <div className="input-container ic2">
                    <input placeholder="Password" type="password" className="input" name="spassword" onChange={onchange} value={cred.spassword} id="spassword" />
                    <div className="cut"></div>
                    <label className="iLabel" htmlFor="spassword">Password</label>
                </div>
                <div className="input-container ic2">
                    <input placeholder="Re-Password" type="password" className="input" name="repassword" onChange={onchange} value={cred.repassword} id="repassword" />
                    <div className="cut"></div>
                    <label className="iLabel" htmlFor="repassword">Re-Password</label>
                </div>
                <button onClick={handlesubmit} className="submit" type="text">Submit</button>
                <div className='Already'>
        <span className="span">Already have an account? <Link to="/signin">Sign In</Link></span>
        </div>
            </div>
            <ToastContainer />
        </div>
    )
}
