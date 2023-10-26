import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { ContactsRoute, setAvatarRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import logo from '../assets/NameLogo.png'

const Contacts = ({contacts,currUser,changeChat,slide}) => {
    const [currName, setCurrName] = useState(undefined)
    const [currAvatar, setCurrAvatar] = useState(undefined)
    const [currSelected, setCurrSelected] = useState(undefined)
    useEffect(() => {
        if(currUser){
            setCurrAvatar(currUser.Avatar);
            setCurrName(currUser.name);
        }
    }, [currUser])
    const handleChangeChat=(i,contact)=>{
        setCurrSelected(i);
        changeChat(contact);
    }
  return (<>
    {
    currAvatar && currName &&

    <div  className={`cont-con ${slide?'cont-slide':''}`}> 
        <div className="brand">
            <img src={logo} alt="logo" />
            {/* <h3>App</h3> */}
        </div>
        <div className="contacts">
            {
                contacts.map((contact,i)=>{
                    return (
                    <div key={i} className={`contact ${i===currSelected?"cselected":""} ${contacts.length>5?i==0?"mtc":"":""}`} onClick={()=>{handleChangeChat(i,contact)}}>
                        <div className="cavatar">
                            <img src={`data:image/svg+xml;base64,${contact.Avatar}`}  alt="" />
                        </div>
                        <div className="cusername">
                            <h3>{contact.name}</h3>
                        </div>
                    </div>
                    )
                })
            
            }

        </div>
            <div className='currUser'>
                <div className="cavatar">
                    <img src={`data:image/svg+xml;base64,${currAvatar}`} alt="avatar"/>
                </div>
                <div className="cusername">
                    <h2>{currName}</h2>
                </div>
            </div>
    </div>
    
    }
    </>
  )
}

export default Contacts
