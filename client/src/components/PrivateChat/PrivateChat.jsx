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
import { GrSend } from "react-icons/gr"
import paperPlane from "../../assets/icons/paper-plane-solid.svg";
import { FiSend, FiHome, FiArrowLeft } from "react-icons/fi";

const socket = io("https://falta-uno-1.herokuapp.com", { autoConnect: false });



export default function PrivateChat({ user, isAuthenticated, isLoading }) {
  const email = user.email;
  const [usersConnected, setUsersConnected] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  let containerUsersConn;
  let containerSelectedUser;




  socket.onAny((event, ...args) => {
    console.log(event, args);
  });



  const selectOnClick = (e, user) => {
    e.preventDefault();
    let clickedUser = user
    for (let i = 0; i < usersConnected.length; i++) {
      let userSearch = usersConnected[i].username
      if (clickedUser === userSearch) {
        usersConnected[i].hasNewMessages = false
        clickedUser = usersConnected[i]

        break
      }
    }
    containerSelectedUser = { ...clickedUser }
    setSelectedUser({ ...clickedUser })

  }




  const handleUsers = (users) => {
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
        user.messages.push({
          content,
          fromSelf: false,
        });


        if (user.userID !== selectedUser.userID) {

          user.hasNewMessages = true;
          setUsersConnected([...containerUsersConn])

        } else {

          setUsersConnected([...containerUsersConn])
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
    const name = user?.name
    socket.auth = { username: username, name: name, image: user?.picture };
    socket.connect();
    socket.emit('user connected')
    socket.emit('users')


  }


  const handleDisconect = (user) => {
    containerUsersConn = containerUsersConn.filter((e) => user !== e.username)
    setUsersConnected([...containerUsersConn])
    if (selectedUser.username === user) {// no funciona despues ver que onda
      selectedUser.username = "desconectado"
      setSelectedUser({ ...selectedUser })
    }
  }




  useEffect(() => {
    userConnect(user?.email)
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


  const backToHome = (e) => {
    e.preventDefault()
    window.location.href = "https://falta-uno-henry.vercel.app";
  }


  const [flag, setFlag] = useState(false)
  const [userSearch, setUserSeach] = useState([])

  return (
    <div className={s.containerAllChat}>
      <div className={s.colum}>
        <button className={s.backToHome} onClick={(e) => backToHome(e)}>
        <FiArrowLeft /> Volver al inicio </button>
        <div>
          <SearchUser usersConnected={usersConnected} setUserSeach={setUserSeach} />
        </div>

        {userSearch.length ? userSearch.map((user) => {
          return <Card className={styles.cardContainer} onClick={(e) => selectOnClick(e, user.username)}>
          <div className={styles.avatarContainer}>
            <img className={styles.avatar} src={user.image} />
          </div>
          <div className={styles.information}>
            <span>{user.name}</span>
            {user.hasNewMessages ? <p className={s.icon}><i class="fa-solid fa-message"></i></p> : null}
            <FiSend className={styles.iconSend} size={23} color='#00B83F' />
          </div>
        </Card>
        })
          : usersConnected.length ? usersConnected.map((user) => {
            if(email === user.username) return;
            return <Card className={styles.cardContainer} onClick={(e) => selectOnClick(e, user.username)}>
              <div className={styles.avatarContainer}>
                <img className={styles.avatar} src={user.image} />
              </div>
              <div className={styles.information}>
                <span>{user.name}</span>
                {user.hasNewMessages ? <p className={s.icon}><i class="fa-solid fa-message"></i></p> : null}
                <FiSend className={styles.iconSend} size={23} color='#00B83F' />
              </div>
            </Card>
          })
            : null
        }




      </div>

      {selectedUser ? <MessagePanel selectedUser={selectedUser} socket={socket} setSelectedUser={setSelectedUser} user={user} /> : null}

    </div >
  );
}