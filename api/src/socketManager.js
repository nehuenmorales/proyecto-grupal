const io = require('./app.js')


// const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, 
// 		LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
// 		TYPING, PRIVATE_MESSAGE  } = require('../Events')

// const { createUser, createMessage, createChat } = require('../Factories')

/*

me logueo ====> emit de mi logueo
emit brockast de tu connect ====> muestra tu conect
me pusheo al array de connect ====> recibo el array de conectados


*/








// let communityChat = createChat()
// function addUser(userList, user){
// 	let newList = Object.assign({}, userList)
// 	newList[user.name] = user
// 	return newList
// }

// module.exports = function(socket){
  
//     const users = [];
//     for (let [id, socket] of io.of("/").sockets) {
//       users.push({
//         userID: id,
//         username: socket.username,
//       });
//     }
//     socket.emit("users", users);
//     // ...
  
//     socket.on("message", (info) => {
//       socket.broadcast.emit("message", {
//       body:info.body,
//       from:info.from ,
//     }
//     );
//   }
// );
 



  // } )
					

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

// 	})
	
// 	//User disconnects
// 	socket.on('disconnect', ()=>{
// 		if("user" in socket){
// 			connectedUsers = removeUser(connectedUsers, socket.user.name)

// 			io.emit(USER_DISCONNECTED, connectedUsers)
// 		}
// 	})


// 	//User logsout
// 	socket.on(LOGOUT, ()=>{
// 		connectedUsers = removeUser(connectedUsers, socket.user.name)
// 		io.emit(USER_DISCONNECTED, connectedUsers)

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
// }