import React, { useEffect,useState } from 'react'
import './Sidebar.css'
import RateReviewIcon from '@material-ui/icons/RateReview';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';
import db, { auth } from './firebase';
const Sidebar = () => {
    const url=useSelector((state)=>state.user.user.photo);

    const [chats, setChats] = useState([]);
   
         useEffect(()=>{
         db.collection('chats').onSnapshot(snapshot=>{
            setChats(snapshot.docs.map(doc=>({
               id:doc.id,
               data:doc.data()
            })))
        })
         },[])    

const addChat=()=>{
    const chatName=prompt('Please enter a chat NAme');
    
    db.collection('chats').add({
        chatName:chatName,
    })
}
    
    return (
        <div className="sidebar">
          <div className="sidebar-header">
              <Avatar onClick={()=>auth.signOut()} src={url}className="sidebar-avatar"/>
              <div className="sidebar-input">
                  <SearchIcon/>
                  <input placeholder="search"/>
              </div>
             <IconButton variant="outlined" className="sidebar-inputButton">
              <RateReviewIcon onClick={addChat}/>
              </IconButton>
          </div>
            <div className="sidebar-chats">
            {
            chats.map(({id,data:{chatName}})=>(


   <SidebarChat key={id} id={id} chatName={chatName}/>
           
    ))
         }              
            </div>
        </div>
    )
}

export default Sidebar
