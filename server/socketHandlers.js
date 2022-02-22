const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const JWT_Secret = process.env.JWT_SECRET;

// send user list to socket user
const sendUsers = (users, socket) => {
	const userList = JSON.parse(JSON.stringify(users));
	for (const key in userList) {
		delete userList[key].token;
	}
	socket.emit('send-users', userList);
};

// send user list to all other socket users
const broadcastUsers = (users, socket) => {
	const userList = JSON.parse(JSON.stringify(users));
	for (const key in userList) {
		delete userList[key].token;
	}
	socket.broadcast.emit('send-users', userList);
};

// User joins Lounge
const joinLoungeHandler = (req, users, socket) => {
	// add user to uses based on whether token exists or not
	if (!req.token && req.username) {
		let id = uuidv4();
		console.log(id);
		let token = jwt.sign({ username: req.username, id }, JWT_Secret);
		users[socket.id] = { username: req.username, id };
		socket.emit('joined', { token: token, username: req.username, id });
	} else if (req.token && !req.username) {
		const decoded = jwt.verify(req.token, JWT_Secret);
		users[socket.id] = { username: decoded.username, id: decoded.id };
		socket.emit('joined', { token: req.token, username: decoded.username, id: decoded.id });
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

	console.log(users[socket.id].username, 'joined the chat');
};

// User sends a message
const messageHandler = (message, socket) => {
	socket.broadcast.emit('chat-message', message);

	console.log(message);
};

// User sends a DM

const directMessageHandler = (message, users, socket) => {
	// get sender id from JWT
	const decoded = jwt.verify(message.token, JWT_Secret);

	const senderID = decoded.id;
	const senderName = decoded.username;
	const receiverID = message.id;

	// get socket id from Users object based on receiver id

	let socketID;
	for (let key in users) {
		if (users[key].id === receiverID) {
			socketID = key;
		}
	}
	const dm = {
		name: senderName,
		id: senderID,
		body: message.body,
	};

	// send message directly to receiver based on socket id
	socket.to(socketID).emit('receive-dm', dm);
};

// User leaves chat
const leaveChatHandler = (users, socket) => {
	socket.broadcast.emit('chat-message', { key: uuidv4(), text: `${users[socket.id].username} left the chat`, type: 'server' });

	console.log(users[socket.id].username, 'left the chat');
};

// User leaves Lounge
const disconnectHandler = (users, socket) => {
	console.log(users[socket.id].username, 'left the lounge');

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
	directMessageHandler,
};
