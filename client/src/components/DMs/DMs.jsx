import "./DMs.scss";
import React, { useContext, useState, useEffect } from "react";
import { SocketContext } from "../../context/socket";

/*  TODOs
1. DONE - DMs still received when Online but DMs are closed.
2. DONE - Offline DMs but can't send messages.
3. Offline DMs but can send messages.
4. Notifications in Banner.
*/

export default function DMs() {
	const socket = useContext(SocketContext);
	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState("");
	const [currentDM, setCurrentDM] = useState("");
	const [me, setMe] = useState({});
	const [dms, setDMs] = useState({});

	const messageHandler = (
		userID,
		senderID,
		username,
		senderName,
		messageBody
	) => {
		const newDM = {
			senderName,
			senderID,
			body: messageBody,
		};

		setDMs((prevDMs) => {
			const newDMs = JSON.parse(JSON.stringify(prevDMs));

			if (!newDMs[userID]) newDMs[userID] = { username, messages: [] };
			const msgArr = newDMs[userID].messages;

			newDMs[userID].messages = [newDM, ...msgArr];

			localStorage.setItem("dms", JSON.stringify(newDMs));
			return newDMs;
		});
	};

	useEffect(() => {
		socket.emit("get-users");
		const storedDMs = JSON.parse(localStorage.getItem("dms")) || {};
		const me = {
			id: JSON.parse(localStorage.getItem("identification")).id,
			name: JSON.parse(localStorage.getItem("identification")).username,
		};
		setMe(me);
		setDMs(storedDMs);
	}, []);

	useEffect(() => {
		socket.on("send-users", (users) => {
			console.log(users);
			setUsers(users);
		});
		socket.on("receive-dm", (msg) => {
			console.log(msg);
			messageHandler(msg.id, msg.id, msg.name, msg.name, msg.body);
		});
		return () => {
			socket.off("receive-dm");
			socket.off("send-users");
		};
	}, [socket]);

	const sendMessage = (event) => {
		event.preventDefault();

		const token = JSON.parse(localStorage.getItem("identification")).token;
		if (!token || !currentDM || !currentUser || !isOnline(currentUser)) return;

		const userValues = Object.values(users);
		const user = userValues.find((user) => user.id === currentUser);
		console.log(user.username, user.id, currentUser);

		messageHandler(currentUser, me.id, user.username, me.name, currentDM);

		socket.emit("send-dm", { token, body: currentDM, id: currentUser });
		setCurrentDM("");
	};

	const selectUser = (user) => {
		setCurrentUser(user);
	};

	const onChangeHandler = (event) => {
		const msg = event.target.value;
		setCurrentDM(msg);
	};

	const isOnline = (user) => {
		const userValues = Object.values(users);
		const userIDs = userValues.map((user) => user.id);
		return userIDs.includes(user);
	};

	const buildUserList = () => {
		const dmKeys = Object.keys(dms);
		const userValues = Object.values(users);
		const userList = [];
		const userIDs = {};
		for (let i = 0; i < userValues.length; i++) {
			const { id, username } = userValues[i];
			if (id === me.id) continue;
			userIDs[id] = id;
			userList.push(
				<div
					className="DMs__User DMs__User--online"
					onClick={() => selectUser(id)}
					key={id}
				>
					{username}
				</div>
			);
		}

		for (let i = 0; i < dmKeys.length; i++) {
			const userID = dmKeys[i];
			const { username } = dms[userID];

			if (userIDs[userID]) continue;

			userList.push(
				<div
					className="DMs__User"
					onClick={() => selectUser(userID)}
					key={userID}
				>
					{username}
				</div>
			);
		}

		return userList;
	};

	const messageBuilder = () => {
		const msgArr = dms[currentUser]?.messages || [];
		const msgList = [];
		for (let i = 0; i < msgArr.length; i++) {
			let className = "DMs__Message ";
			if (msgArr[i].senderID === me.id) className += "DMs__Message--self";
			msgList.push(
				<div key={i} className={className}>
					{msgArr[i].body}
				</div>
			);
		}
		return msgList;
	};

	return (
		<div className="DMs">
			<div className="DMs__User-List">{buildUserList()}</div>
			<div className="DMs__Messages">{messageBuilder()}</div>
			{currentUser && (
				<form className="DMs__Form" onSubmit={sendMessage}>
					<input
						className="DMs__Input"
						value={currentDM}
						onChange={onChangeHandler}
						type="text"
					/>
					<button className="DMs__Submit" type="submit">
						{isOnline(currentUser) ? "Send" : "Offline"}
					</button>
				</form>
			)}
		</div>
	);
}
