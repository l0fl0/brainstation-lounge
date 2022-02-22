import './DMs.scss';
import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../../context/socket';

export default function DMs() {
	const socket = useContext(SocketContext);
	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState('');
	const [currentDM, setCurrentDM] = useState('');
	const [me, setMe] = useState('');
	const [alert, setAlert] = useState(false);
	const [dms, setDMs] = useState({});

	useEffect(() => {
		socket.emit('get-users');
		const storedDMs = JSON.parse(localStorage.getItem('dms')) || {};
		const me = sessionStorage.getItem('id');
		setMe(me);
		setDMs(storedDMs);
	}, [socket]);

	useEffect(() => {
		socket.on('send-users', (users) => {
			setUsers(users);
		});
		socket.on('receive-dm', (msg) => {
			alertHandler(msg);
			messageHandler(msg.id, msg.id, msg.body);
		});
		return () => {
			socket.off('receive-dm');
			socket.off('send-users');
		};
	}, [socket]);

	const alertHandler = (msg) => {
		setAlert(`${msg.name} says: ${msg.body}`);
		setTimeout(() => {
			setAlert('');
		}, 1000);
	};

	const messageHandler = (userID, senderID, messageBody) => {
		setDMs((prevDMs) => {
			const newDMs = { ...prevDMs };
			const msgArr = newDMs[userID] || [];
			const newDM = { id: senderID, body: messageBody };
			newDMs[userID] = [newDM, ...msgArr];
			localStorage.setItem('dms', JSON.stringify(newDMs));
			return newDMs;
		});
	};

	const sendMessage = (event) => {
		event.preventDefault();

		const token = localStorage.getItem('token');
		if (!token || !currentDM || !currentUser) return;

		messageHandler(currentUser, me, currentDM);

		socket.emit('send-dm', { token, body: currentDM, id: currentUser });
		setCurrentDM('');
	};

	const selectUser = (event) => {
		const userID = event.target.value;
		setCurrentUser(userID);
	};

	const onChangeHandler = (event) => {
		const msg = event.target.value;
		setCurrentDM(msg);
	};

	const buildUserDropDown = () => {
		const userKeys = Object.keys(users);
		const userList = [];

		userList.push(
			<option key={420420} value={''}>
				Select a User:
			</option>
		);
		for (let i = 0; i < userKeys.length; i++) {
			userList.push(
				<option value={users[userKeys[i]].id} key={userKeys[i]}>
					{users[userKeys[i]].username}
				</option>
			);
		}
		return userList;
	};

	const messageBuilder = () => {
		const msgArr = dms[currentUser] || [];
		const msgList = [];
		for (let i = 0; i < msgArr.length; i++) {
			let className = 'DMs__Message ';
			if (msgArr[i].id === me) className += 'DMs__Message--self';
			msgList.push(
				<div key={i} className={className}>
					{msgArr[i].body}
				</div>
			);
		}
		return msgList;
	};

	return (
		<div className='DMs'>
			<select onChange={selectUser} className='DMs__Select-User'>
				{buildUserDropDown()}
			</select>
			<div className='DMs__Messages'>{messageBuilder()}</div>
			{currentUser && (
				<form className='DMs__Form' onSubmit={sendMessage}>
					<input className='DMs__Input' value={currentDM} onChange={onChangeHandler} type='text' />
					<button className='DMs__Submit' type='submit'>
						Send
					</button>
				</form>
			)}
		</div>
	);
}
