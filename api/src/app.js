const express = require("express");
const cookieParser = require("cookie-parser");
// const bodyParser = require('body-parser');
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { Server }  = require("socket.io")
const http = require("http");
const socketManager = require("./socketManager")

require("./db.js");

const SocketServer = Server;

const server = express();
const cors=require("cors");
//const { CLIENT_RENEG_LIMIT } = require("tls");

const app = http.createServer(server);

const io = new SocketServer(app, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  console.log("se conecta")
  const username = socket.handshake.auth.username;
  socket.username = username;
  next();
});

// ************** ESTO ES LA PARTE DEL CHAT PRIVADO ***************
io.on("connection",(socket)=>{

const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.username,
      });
      console.log(users)
    }

    socket.emit("users", users)
    // We also notify the existing users
    

      socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: socket.username,
      });

    
  
  
    socket.on("private message", ({ content, to }) => {
      console.log("mensaje", content, socket.id)
      console.log("soy to", to)
      socket.to(to).emit("private message", {
        content,
        from: socket.id,
      });
    })
  });
 



  // } )
					
// 	// console.log('\x1bc'); //clears console
// 	console.log("Socket Id:" + socket.id);

// 	let sendMessageToChatFromUser;

// 	let sendTypingFromUser;

// 	//Verify Username
// 	socket.on(VERIFY_USER, (nickname, callback)=>{
// 		if(isUser(connectedUsers, nickname)){
// 			callback({ isUser:true, user:null })
// 		}else{
// 			callback({ isUser:false, user:createUser({name:nickname, socketId:socket.id})})
// 		}
// 	})

// 	//User Connects with username
// 	socket.on(USER_CONNECTED, (user)=>{
// 		user.socketId = socket.id
// 		connectedUsers = addUser(connectedUsers, user)
// 		socket.user = user

// 		sendMessageToChatFromUser = sendMessageToChat(user.name)
// 		sendTypingFromUser = sendTypingToChat(user.name)

// 		io.emit(USER_CONNECTED, connectedUsers)
// 		console.log(connectedUsers);

// 	})
	
// 	//User disconnects
// 	socket.on('disconnect', ()=>{
// 		if("user" in socket){
// 			connectedUsers = removeUser(connectedUsers, socket.user.name)

// 			io.emit(USER_DISCONNECTED, connectedUsers)
// 			console.log("Disconnect", connectedUsers);
// 		}
// 	})


// 	//User logsout
// 	socket.on(LOGOUT, ()=>{
// 		connectedUsers = removeUser(connectedUsers, socket.user.name)
// 		io.emit(USER_DISCONNECTED, connectedUsers)
// 		console.log("Disconnect", connectedUsers);

// 	})

// 	//Get Community Chat
// 	socket.on(COMMUNITY_CHAT, (callback)=>{
// 		callback(communityChat)
// 	})

// 	socket.on(MESSAGE_SENT, ({chatId, message})=>{
// 		sendMessageToChatFromUser(chatId, message)
// 	})

// 	socket.on(TYPING, ({chatId, isTyping})=>{
// 		sendTypingFromUser(chatId, isTyping)
// 	})

// 	socket.on(PRIVATE_MESSAGE, ({reciever, sender})=>{
// 		if(reciever in connectedUsers){
// 			const newChat = createChat({ name:`${reciever}&${sender}`, users:[reciever, sender] })
// 			const recieverSocket = connectedUsers[reciever].socketId
// 			socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat)
// 			socket.emit(PRIVATE_MESSAGE, newChat)
// 		}
// 	})


































server.name = "API";

server.use(cors())
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;

