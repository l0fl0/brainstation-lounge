const { v4: uuidv4 } = require('uuid');

const newUserHandler = (username, users, socket) => {
	users[socket.id] = username;
	console.log(users[socket.id], 'joined the chat');
	socket.emit('chat-message', { key: uuidv4(), text: `Welcome to the  Lounge Chat ${users[socket.id]}`, type: 'server' });
	socket.broadcast.emit('chat-message', { key: uuidv4(), text: `${users[socket.id]} has joined the chat`, type: 'server' });
	console.log(users);
};

const messageHandler = (message, socket) => {
	console.log(message);
	socket.broadcast.emit('chat-message', message);
};

const unmountHandler = (users, socket) => {
	console.log(users[socket.id], 'left the chat');
	socket.broadcast.emit('chat-message', { key: uuidv4(), text: `${users[socket.id]} left the chat`, type: 'server' });
	delete users[socket.id];
	console.log(users);
};

const disconnectHandler = (users, socket) => {
	console.log(users[socket.id], 'left the site');
	socket.broadcast.emit('chat-message', { key: uuidv4(), text: `${users[socket.id]} left the lounge`, type: 'server' });
	delete users[socket.id];
	console.log(users);
};

module.exports = { newUserHandler, messageHandler, unmountHandler, disconnectHandler };
