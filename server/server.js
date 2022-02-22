const express = require('express');
const http = require('http');
const dotenv = require('dotenv');

const morgan = require('morgan');
const { messageHandler, leaveChatHandler, disconnectHandler, sendUsers, joinLoungeHandler, joinChatHandler, directMessageHandler } = require('./socketHandlers');

// config
dotenv.config();

// initialize the express server
const app = express();
// initialize the http server
const server = http.createServer(app);
// initialize websocket to server
const io = require('socket.io')(server, {
	cors: { origin: process.env.DOMAIN },
});

// Logger for development using cross-env to track the node environment
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
	app.use(morgan('combined'));
}

// store users
let users = {};
//Whenever someone connects this gets executed
io.on('connection', (socket) => {
	// Joining Lounge
	socket.on('join-lounge', (res) => joinLoungeHandler(res, users, socket));

	// Sending Chat Message
	socket.on('send-chat-message', (message) => messageHandler(message, socket));

	// Joining Chat
	socket.on('join-chat', () => joinChatHandler(users, socket));

	// Handling DMs
	socket.on('send-dm', (message) => directMessageHandler(message, users, socket));

	// Receiving User List
	socket.on('get-users', () => sendUsers(users, socket));

	// Leaving Chat
	socket.on('leave-chat', () => leaveChatHandler(users, socket));

	// Leaving Lounge
	socket.on('disconnect', () => disconnectHandler(users, socket));
});

// listen default to 8000 if env variable port is taken or busy
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
