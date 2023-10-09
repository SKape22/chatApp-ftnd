import React, { useEffect, useRef, useState } from 'react'
import Logout from '../Auth/logout'
import './chatContainer.css'
import ChatInput from './chatInput'
import Messages from './messages'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../../utils/APIRoutes'
import {v4 as uuidv4} from 'uuid'

export default function ChatContainer( { currentChat, socket } ) {

    const [ msgs, setMsgs ] = useState([]);
    const [receiveMsg, setReceiveMsg] = useState(null);
    const scrollRef = useRef();

    const getmessages = async () => {
        const userData = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY)
        );
        const response = await axios.post(getAllMessagesRoute, {
            from: userData._id,
            to: currentChat._id,
        })
        setMsgs(response.data)
    }

    useEffect(() => {
        if (currentChat) {
            getmessages();
        }
    },[currentChat]);

    const handleSendMessage = async (msg) => {
        const userData = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY)
        );
        
        console.log(socket);
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: userData._id,
            message: msg,
          });

        await axios.post(sendMessageRoute, {
            from: userData._id,
            to: currentChat._id,
            message: msg
        });

        const messages = [...msgs];
        messages.push({ fromSelf: true, message: msg});
        setMsgs(messages);
    }

    useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg) => {
            console.log(msg)
            setReceiveMsg({ fromSelf: false, message: msg });
          });
        }
    }, []);

    useEffect(() => {
        receiveMsg && setMsgs((prev) => [...prev, receiveMsg]);
    }, [receiveMsg]);
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    },[msgs]);
  return (
    <>
        {currentChat &&   
            <div className='chatRoom-container'>
                <div className='chatRoom-header'>
                    <div className="chatRoom-user-details">
                        <div className="chatRoom-avatar">
                            <img
                                className='chatRoom-avatar-image'
                                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                alt="user_avatar"
                                />
                        </div>
                        <div className='chatRoom-username'>
                            <h3 className='chatRoom-username-text'>{currentChat.username}</h3>
                        </div>
                    </div>
                    <div className='chatRoom-ogout'>
                        <Logout/>
                    </div>
                </div>
                <div className="chatRoom-messages">
                {msgs.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div
                                className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                <div className="content ">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                    })}
                </div>
                <ChatInput handleSendMessage={handleSendMessage}/>
                    
            </div>
        }
    </>
  )
}
