import React, { useState } from 'react'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
import './chatInput.css'
import { IconContext } from 'react-icons/lib'

const ChatInput = ({handleSendMessage}) => {
  const [msg, setMsg] = useState("");
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // const handleEmojiPickerhideShow = () => {
  //   setShowEmojiPicker(!showEmojiPicker);
  // };

  // const handleEmojiClick = (event, emojiObject) => {
  //   let message = msg;
  //   message += emojiObject.emoji;
  //   setMsg(message);
  // };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };

  return (
    <div className='chatInput-wrapper'>
      <div className="button-container">
        {/* <IconContext.Provider value={{ className:"emoji" }}> */}
              {/* <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} /> */}
        {/* </IconContext.Provider> */}
      </div>
      {/* {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />} */}
      <form className='input-container' onSubmit={(e) => sendChat(e)}>
          <input 
            className='input-box' 
            type="text" 
            placeholder='Message'
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button className='chatInput-send'>
            <IconContext.Provider value={{ className: "chatInput-send-icon"}}>
                <IoMdSend/>
            </IconContext.Provider>
          </button>
      </form>
    </div>
  )
}

export default ChatInput
