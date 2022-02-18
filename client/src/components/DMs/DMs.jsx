import './DMs.scss';
import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../../context/socket';

export default function DMs() {
	const socket = useContext(SocketContext);
	const [users, setUsers] = useState([]);

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

	const sendMessage = (userID) => {};
	const buildUserDropDown = () => {
		const userNames = Object.values(users);
		const userIDs = Object.keys(users);
		const userList = [];

		for (let i = 0; i < userNames.length; i++) {
			userList.push(
				<option value={userIDs[i]} key={userIDs[i]}>
					{userNames[i]}
				</option>
			);
		}
		return userList;
	};
	return (
		<div className='DMs'>
			<select className='DMs__Select-User'>{buildUserDropDown()}</select>
			<div className='DMs__Messages'></div>
			<form action=''>
				<input type='text' />
				<button>Send</button>
			</form>
		</div>
	);
}
