import React, {useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignInRoute } from '../utils/ApiRoutes';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import logo from "../assets/NameLogo.png"

export default function SignIn() {
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
    const [cred, setcred] = useState({email:"",password:""})
    const onchange = (e) => {
        setcred({...cred,[e.target.name]:e.target.value});
    }
	const handlesubmit = async (e) => {
		e.preventDefault();
        const {data} = await axios.post(SignInRoute,{
            email:cred.email,
            password: cred.password,
        })
        console.log(data)
		if(data.success){
			localStorage.setItem('chat-app-user',JSON.stringify(data.user));
			navigate('/')
            console.log(navigate)
		}
		else{
            toast.error(data.error,toastoptions)     
		}
	}
  return (
    <div className='formContainer'>
    <div className="lform form" onSubmit={handlesubmit}>
    <div className='logo-wel'>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                <div className="title">Welcome</div>
            <div className="subtitle">Login To Continue</div>
                </div>
                <div className="logo-img">
                    <img src={logo} alt="" />
                </div>
                </div>
        <div className="input-container ic2">
            <input placeholder="Email" type="email" className="input" name='email' onChange={onchange} value={cred.email} id="email" />
            <div className="cut"></div>
            <label className="iLabel" htmlFor="lastname">Email</label>
        </div>
        <div className="input-container ic2">
            <input placeholder="Password" type="password" className="input" name="password" onChange={onchange} value={cred.password} id="password" />
            <div className="cut"></div>
            <label className="iLabel" htmlFor="spassword">Password</label>
        </div>
        <button onClick={handlesubmit} className="submit" type="submit">Submit</button>
        <div className='Already'>
        <span className="span">Don't have an account? <Link to="/signup">Sign up</Link></span>
        </div>
    </div>
    <ToastContainer />
</div>
  )
}
