import React from 'react'
import Robot1 from '../assets/robot1.gif'
export default function Welcome({currUser}) {
  return (
    <div className='w-con'>
        <img src={Robot1} alt="Robot"/>
        <h1>Welcome , <span>{currUser.name}</span></h1>
        <h3>Please select a chat to start</h3>
    </div>
  )
}
