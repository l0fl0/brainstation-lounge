const { v4: uuidv4 } = require('uuid');

// send user list to socket user
const sendUsers = (users, socket) => {
	socket.emit('get-users', users);
};

// send user list to all other socket users
const broadcastUsers = (users, socket) => {
	socket.broadcast.emit('get-users', users);
};

// User joins Lounge
const joinLoungeHandler = (username, users, socket) => {
	users[socket.id] = username || socket.id;
	console.log(users[socket.id], 'joined the lounge');
	broadcastUsers(users, socket);
	console.log(users);
};

// User joins chat
const joinChatHandler = (username, users, socket) => {
	users[socket.id] = username;
	console.log(users[socket.id], 'joined the chat');
	socket.emit('chat-message', { key: uuidv4(), text: `Welcome to the  Lounge Chat ${users[socket.id]}`, type: 'server' });
	socket.broadcast.emit('chat-message', { key: uuidv4(), text: `${users[socket.id]} has joined the chat`, type: 'server' });
	broadcastUsers(users, socket);
	console.log(users);
};

// User sends a message
const messageHandler = (message, socket) => {
	console.log(message);
	socket.broadcast.emit('chat-message', message);
};

// User leaves chat
const leaveChatHandler = (users, socket) => {
	console.log(users[socket.id], 'left the chat');
	socket.broadcast.emit('chat-message', { key: uuidv4(), text: `${users[socket.id]} left the chat`, type: 'server' });
};

// User leaves Lounge
const disconnectHandler = (users, socket) => {
	console.log(users[socket.id], 'left the site');
	socket.broadcast.emit('chat-message', { key: uuidv4(), text: `${users[socket.id]} left the lounge`, type: 'server' });
	delete users[socket.id];
	broadcastUsers(users, socket);
	console.log(users);
};

module.exports = {
	joinChatHandler,
	messageHandler,
	leaveChatHandler,
	disconnectHandler,
	sendUsers,
	joinLoungeHandler,
};
