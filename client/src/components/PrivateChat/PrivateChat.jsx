import React, { useCallback } from "react";
import io from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import MessagePanel from "./messagePanel"
import s from "./privateChat.module.css"
import SearchUser from "./searchBar";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./cardUser.module.css";
import {GrSend} from "react-icons/gr"
import paperPlane from "../../assets/icons/paper-plane-solid.svg"

const socket = io("http://localhost:3001", { autoConnect: false });



export default function PrivateChat({ user, isAuthenticated, isLoading }) {


  const [usersConnected, setUsersConnected] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  let containerUsersConn;


  console.log("users conected", usersConnected)


  socket.onAny((event, ...args) => {
    console.log(event, args);
  });


  const handleUsers = (users) => {
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
    containerUsersConn = usersOrder
    setUsersConnected(usersOrder)

  }

  const handlePrivateChat = (chat) => {
    let content = chat.content
    let from = chat.from


    for (let i = 0; i < containerUsersConn.length; i++) {
      const user = containerUsersConn[i];

      if (user.userID === from) {
        console.log("new message", content)

        user.messages.push({
          content,
          fromSelf: false,
        });


        setUsersConnected([...containerUsersConn])
        if (user !== selectedUser) {
          user.hasNewMessages = true;
        } else {
          setSelectedUser({ ...user })
        }
      }

    }
  }

  const handleUserConnected = (user) => {
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
    containerUsersConn = [...containerUsersConn, user]
    setUsersConnected([...containerUsersConn]);
  }

  function userConnect(username) {
    console.log("user.name", user.name)
    const name = user.name
    socket.auth = { username: username, name: name, image: user.picture };
    socket.connect();
    socket.emit('user connected')
    socket.emit('users')


  }


  const handleDisconect = (user) => {
    console.log("soy containerUsersConn", containerUsersConn)
    containerUsersConn = containerUsersConn.filter((e) => user !== e.username)
    console.log("soy el filtrado", containerUsersConn)
    setUsersConnected([...containerUsersConn])
    if (selectedUser.username === user) {// no funciona despues ver que onda
      selectedUser.username = "desconectado"
      setSelectedUser({ ...selectedUser })
    }
  }




  useEffect(() => {
    userConnect(user.email)
  }, [])

  useEffect(() => {


    socket.on('connection', () => {
      console.log("Connected");
    })

    socket.on("user connected", handleUserConnected);



    socket.on("users", handleUsers);


    socket.on('user disconnected', handleDisconect)

    socket.on("private message", handlePrivateChat);

    return () => {

      socket.off('connection');
      socket.off('user connected');
      socket.off('users');
      socket.off('private message');
      socket.off('user disconnected')
    };


  }, [])











  const selectOnClick = (e,user) => {
    e.preventDefault();
    let clickedUser = user
    for (let i = 0; i < usersConnected.length; i++) {
      let userSearch = usersConnected[i].username
      if (clickedUser === userSearch) {
        clickedUser = usersConnected[i]
        break
      }
    }
    console.log(clickedUser)
    setSelectedUser(clickedUser)
    console.log("soy el valor en el onClick", e.target.value)

  }



  const [flag, setFlag] = useState(false)
  const [userSearch, setUserSeach] = useState([])

  return (
    <div className={s.containerAllChat}>
      <div className={s.colum}>
        <div> <SearchUser usersConnected={usersConnected} setUserSeach={setUserSeach} /> </div>

        {userSearch.length ? userSearch.map((user) => {
          return <div><Card className={styles.cardContainer}>
            <div className={styles.avatarContainer}>
              <img className={styles.avatar} src={user.image} />
            </div>
            <div className={styles.information}>
              <p>
                <span>{user.name}</span>
              </p>
            </div>
            <img src={paperPlane} className={s.paperPlane} value={user.username} onClick={(e) => selectOnClick(e,user.username)} alt="imagen"/>
          </Card></div>
        })
          : usersConnected.length ? usersConnected.map((user) => {
            return <div><Card className={styles.cardContainer}>
              <div className={styles.avatarContainer}>
                <img className={styles.avatar} src={user.image} />
              </div>
              <div className={styles.information}>
                <p>
                  <span>{user.name}</span>
                </p>
              </div>

              <img src={paperPlane} className={s.paperPlane} value={user.username} onClick={(e) => selectOnClick(e,user.username)} alt="imagen"/>

            </Card></div>
          })
            : null
        }




      </div>
        
      {selectedUser ? <MessagePanel selectedUser={selectedUser} socket={socket} setSelectedUser={setSelectedUser} user={user}/> : null}
      
    </div >
  );
}