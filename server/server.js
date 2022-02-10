// const express = require("express");
// const dotenv = require("dotenv");
// const morgan = require("morgan");
// // config
// dotenv.config({ path: "./config/.env" });


// // initialize the express server
// const app = express();
// // initialize the http server
// const http = require("http").Server(app);


// // Logger for development using cross-env to track the node environment
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan('dev'))
// }
// if (process.env.NODE_ENV === "production") {
//   app.use(morgan('combined'))
// }



// module.exports = { http }




// // listen default to 8000 if env variable port is taken or busy
// const PORT = process.env.PORT || 8000;
// http.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));





// initialize websocket to server
const io = require("socket.io")(8080);
let users = {};


//Whenever someone connects this gets executed
io.on('connection', (socket) => {


  // attached to event "send-chat-message"
  socket.on("send-chat-message", message => {
    socket.broadcast.emit("chat-message", message)
  })

  // listen for new user when chat component mounts 
  socket.on("new-user", username => {
    console.log(username, "joined the chat")
    users[socket.id] = username;
    socket.broadcast.emit("user-connected", username)
  })

  socket.on('disconnect', () => {

    console.log(users[socket.id], "left the chat")
    socket.broadcast.emit("user-disconected", users[socket.id])
    delete users[socket.id]
  });
});


