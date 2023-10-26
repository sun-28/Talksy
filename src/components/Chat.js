import React, { useEffect, useState, useRef } from "react";
import Contacts from "./Contacts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContactsRoute, host } from "../utils/ApiRoutes";
import Welcome from "./Welcome";
import ChatContainer from "./ChatContainer";
import { io } from "socket.io-client";
const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currUser, setCurrUser] = useState(undefined);
  const [currChat, setCurrChat] = useState(undefined);
  const [slide, setslide] = useState(false);
  const navi = useNavigate();
  const handleChatChange = (chat) => {
    setCurrChat(chat);
  };
  const func1 = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navi("/signin");
    } else {
      setCurrUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    }
  };
  const func2 = async () => {
    if (currUser) {
      if (currUser.isAvatarSet) {
        const data = await axios.get(`${ContactsRoute}/${currUser._id}`);
        setContacts(data.data);
      } else {
        navi("/setavatar");
      }
    }
  };
  useEffect(() => {
    if (currUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currUser._id);
    }
  }, [currUser]);
  useEffect(() => {
    func1();
  }, []);

  useEffect(() => {
    func2();
  }, [currUser]);
  return (
    <div className="chat-con">
      <div
        style={{
          position: "absolute",
          height: "100vh",
          width: "10vw",
          backgroundColor: "#131324",
          left: "-5vw",
          zIndex: "100",
        }}
      ></div>
      <div className={`${slide ? "con-slide" : "con"}`}>
        <div
          onClick={() => {
            setslide(!slide);
          }}
          className={`ham ${slide ? "ham-slide" : ""}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="right-arrow"><path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path></svg>
        </div>
        <Contacts
          contacts={contacts}
          currUser={currUser}
          changeChat={handleChatChange}
          slide={slide}
        />
        {currChat === undefined ? (
          currUser && <Welcome currUser={currUser} />
        ) : (
          <ChatContainer
            currChat={currChat}
            currUser={currUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
