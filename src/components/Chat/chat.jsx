import React, { useEffect, useState } from 'react'
import './chat.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getContactsRoute } from '../../utils/APIRoutes';
import Contact from '../Contacts/contacts';
import Welcome from '../ChatRoom/welcome';
import ChatContainer from '../ChatRoom/chatContainer';

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isUserLoading, setIsUserLoading] = useState(true);

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
      setIsUserLoading(false);
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

  const changeChat = (chat) => {
    setCurrentChat(chat);
  }
console.log(currentUser)
  return (
    <div className='wrapper'>
      <div className='chat_container'>
        <Contact contacts={contacts} currentUser={currentUser} changeChat={changeChat}></Contact>
        {
          !isUserLoading && currentChat === undefined ? <Welcome user={currentUser}/> : <ChatContainer currentChat={currentChat}/>
        }
      </div>
    </div>
  )
}

export default Chat
