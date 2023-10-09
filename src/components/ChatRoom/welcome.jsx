import React, { useState, useEffect } from 'react'
import './welcome.css'

const Welcome = () => {
    const [currentUsename, setCurrentUserName] = useState(undefined);

    const getUserData = async () => {
      const userData = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY)
      );

      setCurrentUserName(userData.username)
    }
    useEffect(() => {
      getUserData();
    },[])

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
