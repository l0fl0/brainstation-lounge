import "./Users.scss";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/socket";

//TODO:
// add state from dms app to users app (active, AFK)
// add icons to open chat with others
// save usernames if sent dms have been sent between users
export default function Users() {
	const socket = useContext(SocketContext);
	const [users, setUsers] = useState({});

	useEffect(() => {
		socket.emit("get-users");
	}, []);

	useEffect(() => {
		socket.on("send-users", (users) => {
			setUsers(users);
		});
		return () => {
			socket.off("send-users");
		};
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
		<section className="users">
			<h2 className="users__title">Users</h2>
			<div className="users__list">{userListBuilder()}</div>
		</section>
	);
}
