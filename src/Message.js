import { Avatar } from '@material-ui/core'
import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import './Message.css'
import { selectUser } from './userSlice'


const Message = forwardRef(
    ({id,contents:{timestamp,displayName,email,message,photo,uid}},ref) => {
    const user=useSelector(selectUser)
    return (
        <div ref={ref} className={`message ${user.email ===email && "message-sender"}`}>
            <Avatar  className="message-photo"src={photo}/>
    <p>{message}</p>
         <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
         </div>
    )
})

export default Message
