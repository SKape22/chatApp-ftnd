import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './auth.css'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import axios from 'axios';
import { loginRoute } from '../../utils/APIRoutes';

const Login = () => {
    const navigate = useNavigate();
    const [credentials,setCredentials] = useState({
        username: "",
        pass: "",
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
        const {username, pass} = credentials;
        if (pass === "") {
            toast.error("Username and Password are required", toastParams)
            return false;
        }
        if (username === "") {
            toast.error("Username and Password are required", toastParams)
            return false;
        }
        return true
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("api called")
            const {username, pass} = credentials;
            const {data} = await axios.post(loginRoute, {
                username, pass
            });

            if (data.status === false) {
                toast.error(data.msg, toastParams)
            }

            if (data.status) {
                localStorage.setItem(
                    'chatApp-user',
                    JSON.stringify(data.user)
                )
                navigate("/");
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
                        <h1 className='brand-title'>EchoExchange</h1>
                    </div>
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='pass'
                        onChange={(e) => handleChange(e)}
                    />
                    <button type='submit'>
                        Submit
                    </button>
                    <span>
                        Don't have and account? <Link to="/register"> Register </Link>
                    </span>
                </form>
            </div>
            <ToastContainer/>
        </>
    )
}


export default Login


