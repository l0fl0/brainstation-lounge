const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const JWT_Secret = process.env.JWT_SECRET;

// send user list to socket user
const sendUsers = (users, socket) => {
	const userList = { ...users };
	for (const key in userList) {
		delete userList[key].token;
	}
	socket.emit('send-users', userList);
};

// send user list to all other socket users
const broadcastUsers = (users, socket) => {
	const userList = { ...users };
	for (const key in userList) {
		delete userList[key].token;
	}
	socket.broadcast.emit('send-users', userList);
};

// User joins Lounge
const joinLoungeHandler = (res, users, socket) => {
	// add user to uses based on whether token exists or not
	if (!res.token && res.username) {
		let token = jwt.sign({ username: res.username }, JWT_Secret);
		users[socket.id] = { username: res.username, token };
		socket.emit('joined', token);
	} else if (res.token && !res.username) {
		const decoded = jwt.verify(res.token, JWT_Secret);
		users[socket.id] = { username: decoded.username, token: res.token };
	}

	// Broadcast Users
	broadcastUsers(users, socket);

	console.log(users[socket.id].username, 'joined the lounge');
};

// User joins chat
const joinChatHandler = (users, socket) => {
	// Send message to user
	socket.emit('chat-message', { key: uuidv4(), text: `Welcome to the  Lounge Chat ${users[socket.id].username}`, type: 'server' });

	// Send message to Room
	socket.broadcast.emit('chat-message', { key: uuidv4(), text: `${users[socket.id].username} has joined the chat`, type: 'server' });

	console.log(users[socket.id], 'joined the chat');
};

// User sends a message
const messageHandler = (message, socket) => {
	socket.broadcast.emit('chat-message', message);

	console.log(message);
};

// User leaves chat
const leaveChatHandler = (users, socket) => {
	socket.broadcast.emit('chat-message', { key: uuidv4(), text: `${users[socket.id].username} left the chat`, type: 'server' });

	console.log(users[socket.id].username, 'left the chat');
};

// User leaves Lounge
const disconnectHandler = (users, socket) => {
	console.log(users[socket.id].username, 'left the site');

	// delete user from object
	delete users[socket.id];

	// Broadcast Users
	broadcastUsers(users, socket);
};

module.exports = {
	joinChatHandler,
	messageHandler,
	leaveChatHandler,
	disconnectHandler,
	sendUsers,
	joinLoungeHandler,
};
