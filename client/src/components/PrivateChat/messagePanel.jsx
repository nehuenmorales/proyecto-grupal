import React from "react"
import s from "./privateChat.module.css"
import { useState } from "react";
import { useEffect } from "react";




export default function MessagePanel({  selectedUser,socket,setSelectedUser}){
  console.log("soy el selectedUser", selectedUser)
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);



  useEffect(()=>{
    console.log("entro a ")
    setMessages(selectedUser.messages)
  },[selectedUser.messages.length])
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    
    socket.emit("private message", {
      content,
      to: selectedUser.userID,
    });
    
    selectedUser.messages.push({
      content,
      fromSelf: true,
    });

    setSelectedUser({...selectedUser})

    setContent("")
  
}
    return(

      <div className={s.comlumR}>
        <h2>{selectedUser.username}</h2>

        {messages.length?messages.map((e)=>
           <div>
           {e.fromSelf?<h6>yo</h6>:<h6>otro</h6>}
            <h6>{e.content}</h6>
          </div>
        ):null}
      <form onSubmit={(e)=>handleSubmit(e)} className="bg-zinc-900 p-10">
          
               <div  className={s.inputchat}>
                <input
                  name="message"
                  type="text"
                  value={content}
                  placeholder="Write your message..."
                  onChange={(e) => {e.preventDefault();
                    return setContent(e.target.value)}}
                  autoFocus
                />
                <button type="submit" >Enviar</button>
                </div> 

      </form>
      </div>
    )      
    }