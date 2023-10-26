import Picker from 'emoji-picker-react'
import React, { useState } from 'react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
const ChatInput = ({handleSendMsg}) => {
    const [showemoji, setshowemoji] = useState(false)
    const [msg, setmsg] = useState("")
    const toggleEmoji = () =>{
        setshowemoji(!showemoji);
    }
    const handleEmojiClick=(emojiOb,e)=>{
        let message = msg;
        message += emojiOb.emoji;
        setmsg(message);
    }
    const sendChat = (e) => {
        e.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setmsg("");
        }
    }
  return (
    <div className='input-con'>
        <div className="btn-con">
            <div className="emoji">
                <BsEmojiSmileFill onClick={toggleEmoji}/>
                {showemoji && <Picker height={"300px"} width={"280px"} onEmojiClick={handleEmojiClick}/>}
            </div>
        </div>
        <form className='input-form' onSubmit={(e)=>{sendChat(e)}}>
            <input type="text" placeholder='type your message here' value={msg} onChange={(e)=>{setmsg(e.target.value)}}/>
            <button className='isubmit' type='submit'>
                <IoMdSend/>
            </button>
        </form>
    </div>
  )
}

export default ChatInput
