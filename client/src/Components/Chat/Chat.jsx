import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./Chat.scss";
import formatTime from "../../utils/formatDate";
import Message from "../Message/Message";
// set a global immutable for the socket connection
const socket = io("http://localhost:8080");
let username = null;

export default function Chat() {
	const [msgs, setMsgs] = useState([]);
	const [msgInput, setMsgInput] = useState("");

	// sockets need to be global
	// handle incomming message display
	socket.on("chat-message", (data) => {
		setMsgs([data, ...msgs]);
	});
	// handle user connected message display
	socket.on("user-connected", (username) => {
		setMsgs([
			{
				text: `${username} has joined the chat`,
				timestamp: formatTime(Date()),
			},
			...msgs,
		]);
	});

	// Like a componentDidMount lifecycle method
	useEffect(() => {
		// sets username on Component mount for chat / saves username per session

		username = prompt("What is your name? ");
		sessionStorage.setItem("username", username);
		setMsgs([
			{
				text: `Welcome to BSTN Chat ${username}`,
				timestamp: formatTime(Date()),
			},
		]);
		socket.emit("new-user", username);
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();
		if (!msgInput || !event.target.chatText.value) return;

		// user input messages sends obj after array of msgs
		setMsgs([
			{
				currentUser: true,
				text: msgInput,
				timestamp: formatTime(Date()),
			},
			...msgs,
		]);

		// send message to broadcast listener
		socket.emit("send-chat-message", {
			user: username,
			currentUser: false,
			text: msgInput,
			timestamp: formatTime(Date()),
		});

		// sets both state and form input to empty string no empty messages
		event.target.chatText.value = "";
		setMsgInput("");
	};

	const onChangeHandler = (event) => {
		setMsgInput(event.target.value);
	};

	return (
		<div className="chat">
			<div className="chat__text">
				{msgs.map((message, i) => {
					return (
						<Message key={i} message={message} isSelf={message.currentUser} />
					);
				})}
			</div>
			<div className="chat__input">
				<i className="fas fa-user" />
				<form onSubmit={sendMessage} className="chat__form" autoComplete="off">
					<input
						onChange={onChangeHandler}
						name="chatText"
						id="chatText"
						className="chat__input-field"
						type="text"
					/>
					<button type="submit" className="button button-chat">
						send
					</button>
				</form>
			</div>
		</div>
	);
}
