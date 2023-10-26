import React, { useEffect, useRef, useState } from 'react'
import Logout from './Logout'
import ChatInput from './ChatInput'
import {v4 as uuidv4} from 'uuid';
import axios from 'axios'
import { GetMsgRoute, SendMsgRoute } from '../utils/ApiRoutes'
export default function ChatContainer({currChat,currUser,socket}) {
    const scrollRef=useRef();
    const [messages, setmessages] = useState([])
    const [Arriving, setArriving] = useState(null)
    const effect = async () =>{
        const res = await axios.post(GetMsgRoute,{
          from: currUser._id,
          to: currChat._id,
        })
        setmessages(res.data);
    }

    useEffect(() => {
      if(currChat)
      effect()
    }, [currChat])
    useEffect(() => {
    if(socket.current)
    socket.current.on('msg-recieve',(msg)=>{
      setArriving({fromSelf:false ,message:msg})
    });
    }, [])
    useEffect(() => {
      if(Arriving){
      const msgs=[...messages];
      msgs.push(Arriving);
      setmessages(msgs);
    }
    }, [Arriving])
    useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour:'smooth'});
    }, [messages])
    const handleSendMsg= async (msg)=>{
      await axios.post(SendMsgRoute,{
        from:currUser._id,
        to: currChat._id,
        msg,
      })
      socket.current.emit('send-msg',{
        to:currChat._id,
        from:currUser._id,
        message:msg
      }) 
      const msgs=[...messages];
      msgs.push({fromSelf:true,message:msg});
      setmessages(msgs);
    }
  return (
    <div className='ChatCon'>
        <div className="chatHead">
        <div className="userdetails">
            <div className="cc-avatar">
            <img src={`data:image/svg+xml;base64,${currChat.Avatar}`}  alt="" />
            </div>
            <div className="cc-username">
                <h3>{currChat.name}</h3>
            </div>
        </div>
        <Logout/>
        </div>
        <div className="chat-msg">
            {
              messages.length>0?messages.map((msg)=>{
                  return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div className={`message ${msg.fromSelf?"sended":"recieved"}`}>
                      <div className="content">
                        <p>
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  )
              }):<div className='message no-msg'><div>
              <p>
                No messages
              </p>
            </div></div>
            }
        </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </div>
  )
}
