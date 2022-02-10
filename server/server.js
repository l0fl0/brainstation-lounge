const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
// config
dotenv.config({ path: "./config/.env" });


// initialize the express server
const app = express();
// initialize the http server
const http = require("http").Server(app);
// initialize websocket to server
const io = require("socket.io")(http);


// Logger for development using cross-env to track the node environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}
if (process.env.NODE_ENV === "production") {
  app.use(morgan('combined'))
}

//? Test socket on 

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});






// listen default to 8000 if env variable port is taken or busy
const PORT = process.env.PORT || 8000;
http.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));