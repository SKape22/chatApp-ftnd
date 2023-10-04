import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Auth/register'
import Login from './components/Auth/login'
import Chat from './components/Chat/chat'
import SetAvatar from './components/Auth/setAvatar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/setAvatar' element={<SetAvatar/>}/>
        <Route path='/' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
