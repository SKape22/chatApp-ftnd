import React from 'react'
import './chatContainer.css'

export default function ChatContainer( {currentChat} ) {
    console.log(currentChat)
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
                </div>
                <div className='chatRoom-messages'>
                
                </div>
                <div className="chatRoom-input">
                    
                </div>
            </div>
        }
    </>
  )
}
