import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './auth.css'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import axios from 'axios';

const Register = () => {

    const [credentials,setCredentials] = useState({
        username: "",
        email: "",
        pass: "",
        confPass: ""
    });
    
    const toastParams = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: false,
        draggable: false,
        theme: "dark"
    };

    const validate = () => {
        const {pass, confPass, userName, email} = credentials;
        if (pass !== confPass) {
            toast.error("Passwords don't match", toastParams);
            return false;
        }
        else if (pass.length < 8) {
            toast.error("Password should be longer than 8 characters", toastParams)
            return false;
        }
        else if (userName.length < 4) {
            toast.error("UserName should be longer than 4 characters", toastParams)
            return false;
        }
        else if (email === "") {
            toast.error("UserName should be longer than 4 characters", toastParams)
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const {pass, confPass, userName, email} = credentials;
            // const {data} = await axios.post()
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


