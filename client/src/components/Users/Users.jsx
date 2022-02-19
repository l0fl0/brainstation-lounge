import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/socket';

export default function Users() {
	const socket = useContext(SocketContext);
	const [users, setUsers] = useState({});

	useEffect(() => {
		socket.emit('get-users');
		return socket.offAny('get-users');
	}, []);

	useEffect(() => {
		socket.on('send-users', (users) => {
			setUsers(users);
		});
		return socket.offAny('send-users');
	}, [socket]);

	const userListBuilder = () => {
		const userKeys = Object.keys(users);
		const userList = [];

		for (let i = 0; i < userKeys.length; i++) {
			userList.push(<p key={i}>{users[userKeys[i]].username}</p>);
		}
		return userList;
	};
	return (
		<div>
			<h1>Users</h1>
			{userListBuilder()}
		</div>
	);
}
