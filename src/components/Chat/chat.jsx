import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getContactsRoute, host } from '../../utils/APIRoutes';
import Contact from '../Contacts/contacts';
import Welcome from '../ChatRoom/welcome';
import ChatContainer from '../ChatRoom/chatContainer';
import {io} from "socket.io-client"

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  async function getContactData(user) {
    const data = await axios.get(`${getContactsRoute}/${user._id}`);
    setContacts(data.data);
  }
  
  async function checkUser() {
    if (!localStorage.getItem("chatApp-user")) {
      navigate("/login")
    } else {
      const temp = await JSON.parse(localStorage.getItem("chatApp-user"));
      setCurrentUser(temp);
      if (temp.avatarImage) {
        getContactData(temp);
      } else {
        navigate('/setAvatar')
      }
    }
  }
  
  useEffect(() => {
    checkUser();
  }, [])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser])

  const changeChat = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <div className='wrapper'>
      <div className='chat_container'>
        <Contact contacts={contacts} currentUser={currentUser} changeChat={changeChat}></Contact>
        {
          (currentChat === undefined) ? <Welcome user={currentUser}/> : <ChatContainer currentChat={currentChat} socket={socket}/>
        }
      </div>
    </div>
  )
}

export default Chat
