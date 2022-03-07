import React,{useState,useEffect} from 'react'
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css'
import FlipMove from 'react-flip-move'
import { IconButton } from '@material-ui/core';
import Message from './Message';
import firebase from 'firebase'
import { selectChatId, selectChatName } from './app/chatSlice';
import { useSelector } from 'react-redux';
import db from './firebase';
import * as timeago from 'timeago.js';
import { selectUser } from './userSlice';
const Chat = () => {
    const[input,setInput]=useState('');
    const user=useSelector(selectUser);
    const chatName=useSelector(selectChatName);
    const chatId=useSelector(selectChatId);
    const [messages,setMessages]=useState([]);


    useEffect(()=>{
if(chatId)
{

db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>{
    setMessages(snapshot.docs.map(doc=>({
       id:doc.id,
       data:doc.data()
    })))
})
}
    },[chatId])
    const sendMessage=(e)=>
    {
         e.preventDefault();
         
     
          db.collection('chats').doc(chatId).collection('messages').add({
              timestamp:firebase.firestore.FieldValue.serverTimestamp(),
              message:input,
              uid:user.uid,
              photo:user.photo,
              email:user.email,
              displayName:user.displayName

          })

          setInput('')


        }
    return (
        <div className="chat">
            <div className="chat-header">
    <h4>
    To:<span className="chat-name">{chatName}</span>
        </h4>
    <strong>Details</strong>
            </div>
 <div className="chat-message">
     <FlipMove>
{
    messages.map(({id,data})=>(
        <Message key={id} contents={data}/>
    ))
}
</FlipMove>
 </div>
            <div className="chat-input">
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="iMessage" type="text"/>
                    <button onClick={sendMessage}>Send Message</button>
                </form>
                <IconButton>
                <MicIcon className="chat-mic"/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
