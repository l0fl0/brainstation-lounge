import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/socket';

export default function Users() {
	const socket = useContext(SocketContext);
	const [users, setUsers] = useState({});
	console.log(Object.keys(socket));

	useEffect(() => {
		socket.emit('get-users');
		return socket.offAny('get-users');
	}, []);

	useEffect(() => {
		socket.on('send-users', (users) => {
			console.log(users);
			setUsers(users);
		});
		return socket.offAny('send-users');
	}, [socket]);

	const userListBuilder = () => {
		const userNames = Object.values(users);
		const userList = [];

		for (let i = 0; i < userNames.length; i++) {
			userList.push(<p key={i}>{userNames[i]}</p>);
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
