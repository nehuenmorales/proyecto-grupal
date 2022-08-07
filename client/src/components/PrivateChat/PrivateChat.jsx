import React from "react";
import io from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0} from "@auth0/auth0-react";
import MessagePanel from "./messagePanel"
import s from "./privateChat.module.css"

const socket = io("http://localhost:3001",{ autoConnect: false });



export default function PrivateChat({user,isAuthenticated,isLoading}) {


  const [usersConnected, setUsersConnected] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");



  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  function userConnect(username){
    console.log("entro")
    socket.auth = { username };
  socket.connect();
  socket.emit("userConnected",user.email)

  }



  useEffect(()=>{
    userConnect(user.email)
    



    socket.on('connection', ()=>{
           console.log("Connected");
        })
  
  
    
   
  socket.on("user connected", (user) => {
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
    
    setUsersConnected([...usersConnected,user]);
  });
    
  
  
  socket.on("users", (users) => {
    console.log("entro a users")
    users.forEach((user) => {
      user.self = user.userID === socket.id;
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    });
    // put the current user first, and then sort by username
    let usersOrder = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    })
    console.log("soy users1",usersOrder)
    setUsersConnected([...usersOrder])
  });
  
  socket.on("private message", ({ content, from }) => {
    for (let i = 0; i < usersConnected.length; i++) {
      const user = usersConnected[i];
      if (user.userID === from) {
        console.log("new message",content)
        user.messages.push({
          content,
          fromSelf: false,
        });
        if (user !== selectedUser) {
          user.hasNewMessages = true;
        }else{
          setSelectedUser({...selectedUser})
        }
        break;
      }
    }
  });

  return () => {
    socket.off('connection');
    // socket.off('users');
    // socket.off('private message');

  };
  },[])
 


  
  
  
 
  
  


const selectOnClick = (e) =>{
  e.preventDefault();
  let clickedUser=e.target.value
  for (let i = 0; i < usersConnected.length; i++) {
    let userSearch= usersConnected[i].username
    if(clickedUser===userSearch){
      clickedUser=usersConnected[i]
      break
    }
  }
  console.log(clickedUser)
  setSelectedUser( clickedUser)
  
}

  


  
  return (
    <div className={s.containerAllChat}>
       <div className={s.colum}>
          {usersConnected.length? usersConnected.map((user)=>
            <button  style={{"color":"black"}} value={user.username} onClick={(e)=>selectOnClick(e)}>{user.username}</button>
          ):<h3>No hay usuarios conectados</h3>}
        </div> 
        {selectedUser?<MessagePanel selectedUser={selectedUser} socket={socket} setSelectedUser={setSelectedUser} />:null}
    </div>
  );
}