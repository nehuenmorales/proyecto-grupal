import React, { useRef } from "react"
import s from "./privateChat.module.css"
import { useState } from "react";
import { useEffect } from "react";
import { FiSend } from "react-icons/fi";

export default function MessagePanel({ selectedUser, socket, setSelectedUser }) {
  console.log("soy el selectedUser", selectedUser)
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null)



  useEffect(() => {
    console.log("entro a ")
    setMessages(selectedUser.messages)
    messagesEndRef.current?.scrollIntoView()
  }, [selectedUser.messages.length])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content) {
      return;
    }
    socket.emit("private message", {
      content,
      to: selectedUser.userID,
    });

    selectedUser.messages.push({
      content,
      fromSelf: true,
    });

    setSelectedUser({ ...selectedUser })

    setContent("")

  }
  return (

    <div className={s.comlumR}>
      <div className={s.userMessaging}>
        <img src={selectedUser.image} className={s.image} />
        <h2 className={s.userTitle}>{selectedUser.name}</h2>
        <div></div>
      </div>
      <div className={s.chat}>
        {messages.length ? messages.map((e) => {
          return e.fromSelf ? <div className={s.derecha}>
            <p className={s.ownMessage}>{e.content}</p>
            <img src={e.image} /> </div> : <div className={s.izquierda}> <div className={s.recievedMessage}>
              <p>{e.content}</p>
            </div>  </div>
        }
        ) : null}
        <div ref={messagesEndRef} ></div>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={s.inputchat}>
        <input
          name="message"
          type="text"
          value={content}
          placeholder="Escribí tu mensaje..."
          onChange={(e) => {
            e.preventDefault();
            return setContent(e.target.value)
          }}
          className={s.inputTypeChat}
          autoFocus
        />

        <button type="submit" className={s.button} >Enviar <FiSend /> </button>

      </form>

    </div>
  )
}