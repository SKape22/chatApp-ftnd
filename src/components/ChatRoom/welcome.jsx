import React, { useState, useEffect } from 'react'
import './welcome.css'

const Welcome = ({ user }) => {
    const [currentUsename, setCurrentUserName] = useState(undefined);

    useEffect(() => {
        if (user) {
            setCurrentUserName(user.username);
        }
    },[user])

  return (
    <>
      <div className='welcome-container'>
        <h1 className='welcome-text'>Welcome, <span className='welcome-username'>{currentUsename}.</span></h1>
        <h3 className='welcome-text'>Please select a user to start conversation.</h3>
      </div>
    </>
  )
}

export default Welcome
