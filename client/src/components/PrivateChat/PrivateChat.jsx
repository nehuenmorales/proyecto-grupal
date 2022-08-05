import React from "react";
import io from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0} from "@auth0/auth0-react";






// export default function PrivateChat(){
//     reuseEffect{

//     }

//     const connectToChat=()=>{
//         const socket = io("http://localhost:3001");
//         socket.on('connect', ()=>{
// 			console.log("Connected");
// 		})
//     }turn (
//       <div>
        
//       </div>
  
  
//     );
//   }

const socket = io("http://localhost:3001");


export default function PrivateChat({user}) {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [usersConnected, setUsersConnected] = useState([]);

  console.log("estoy logueado", user)


  // const user  = useSelector(state=> state.getPlayersReducer.playerProfile)
  const conectionUser=(arrayConected)=>{
    setUsersConnected(Array)
  }
  
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };
    
    socket.on('connection', ()=>{
           console.log("Connected");
        })

    socket.on("message", receiveMessage);

    
        // socket.emit("enterPage",user.email)
  
      
  console.log("conectado")
  socket.on("enterPage",conectionUser)

  const handleSubmit = (event) => {
    console.log("soy email",user)
    event.preventDefault();
    const newMessage = {
      body: message,
      from: user.email, 
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
    socket.emit("message", newMessage);
    // socket.emit("enterPage", user.email);


  };

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2">Chat React</h1>
        <input
          name="message"
          type="text"
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-zinc-500 p-2 w-full text-black"
          value={message}
          autoFocus
        />

        <ul className="h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`my-2 p-2 table text-sm rounded-md ${
                message.from === "Me" ? "bg-sky-700 ml-auto" : "bg-black"
              }`}
            >
              <b>{message.from}</b>:{message.body}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}