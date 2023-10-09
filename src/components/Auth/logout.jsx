import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiPowerOff} from 'react-icons/bi'
import axios from 'axios';
import './auth.css'

export default function Logout() {
const navigate = useNavigate();
const handleClick = async () => {
    localStorage.clear();
    navigate('/login');
}

  return (
    <div 
        className='logout-button'
        onClick={handleClick}    
    >
      <BiPowerOff/>
    </div>
  )
}
