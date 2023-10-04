import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './auth.css'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import axios from 'axios';
import { registerRoute } from '../../utils/APIRoutes';

const Register = () => {
    const navigate = useNavigate();
    const [credentials,setCredentials] = useState({
        username: "",
        email: "",
        pass: "",
        confPass: ""
    });
    
    useEffect(() => {
      if (localStorage.getItem('chatApp-user')) {
        navigate('/');
      }
    },[])

    const toastParams = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: false,
        draggable: false,
        theme: "dark"
    };

    const validate = () => {
        const {username, email, pass, confPass} = credentials;
        if (pass !== confPass) {
            toast.error("Passwords don't match", toastParams);
            return false;
        }
        if (pass.length < 8) {
            toast.error("Password should be longer than 8 characters", toastParams)
            return false;
        }
        if (username.length < 4) {
            toast.error("UserName should be longer than 4 characters", toastParams)
            return false;
        }
        if (email === "") {
            toast.error("UserName should be longer than 4 characters", toastParams)
            return false;
        }
        return true
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("api called")
            const {pass, username, email} = credentials;
            const {data} = await axios.post(registerRoute, {
                username, email, pass
            });

            if (data.status === false) {
                toast.error(data.msg, toastParams)
            }

            if (data.status) {
                localStorage.setItem(
                    'chatApp-user',
                    JSON.stringify(data.user)
                )
                navigate("/setAvatar");
            }

        };
    };
    
    const handleChange = (e) => { 
        setCredentials({...credentials, [e.target.name]: e.target.value})
    };

    return (
        <>
            <div className="form-container">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <h1 className='brand-title'>App title</h1>
                    </div>
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='pass'
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='confPass'
                        onChange={(e) => handleChange(e)}
                    />
                    <button type='submit'>
                        Submit
                    </button>
                    <span>
                        Already registered ? <Link to="/login"> Login </Link> instead.
                    </span>
                </form>
            </div>
            <ToastContainer/>
        </>
    )
}


export default Register


