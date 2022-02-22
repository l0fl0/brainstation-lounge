import { useState, useEffect, useContext, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Chat.scss";
import formatTime from "../../utils/formatDate";
import Message from "./Message/Message";
import { SocketContext } from "../../context/socket";

export default function Chat() {
	const socket = useContext(SocketContext);

	let [msgs, setMsgs] = useState([]);
	const [msgInput, setMsgInput] = useState("");

	const updateMessages = useCallback((message) => {
		// local storage for messages
		const oldMessages = JSON.parse(sessionStorage.getItem("messages"));

		sessionStorage.setItem(
			"messages",
			JSON.stringify([message, ...oldMessages])
		);

		// live render of messages
		let incommingMessage = (
			<Message
				key={message.key}
				message={message}
				isSelf={message.currentUser}
			/>
		);

		setMsgs(JSON.parse(sessionStorage.getItem("messages")));
	}, []);

	const broadcastMessage = useCallback(
		(message) => {
			// send message to server for broadcast
			socket.emit("send-chat-message", {
				key: message.key,
				user: sessionStorage.getItem("username"),
				currentUser: false,
				text: message.text,
				timestamp: message.timestamp,
			});
		},
		[socket]
	);

	const messageHandler = (event) => {
		event.preventDefault();
		if (!msgInput || !event.target.chatText.value) return;

		// update userview with message
		const userMessage = {
			key: uuidv4(),
			currentUser: true,
			text: msgInput,
			timestamp: formatTime(Date()),
		};

		updateMessages(userMessage);
		broadcastMessage(userMessage);

		// sets both state and form input to empty string no empty messages
		event.target.chatText.value = "";
		setMsgInput("");
		event.target.chatText.focus();
	};

	const onChangeHandler = (event) => {
		setMsgInput(event.target.value);
	};

	useEffect(() => {
		if (!sessionStorage.getItem("messages")) {
			sessionStorage.setItem("messages", "[]");
		}
		// sets username on component mount for chat / saves username per session
		if (!sessionStorage.getItem("username")) {
			sessionStorage.setItem("username", prompt("What is your name? "));
		}
		// send new user event
		socket.emit("join-chat", sessionStorage.getItem("username"));

		// Subscribe to events
		socket.on("chat-message", (data) => {
			updateMessages(data);
		});

		return () => {
			socket.off("chat-message");
			socket.emit("leave-chat", sessionStorage.getItem("username"));
		};
	}, [socket]);

	return (
		<div className="chat">
			<div className="chat__text">
				{msgs.map((message) => (
					<Message
						key={message.key}
						message={message}
						isSelf={message.currentUser}
					/>
				))}
			</div>
			<div className="chat__input">
				<i className="fa-solid fa-chevron-right" />
				<form
					onSubmit={messageHandler}
					className="chat__form"
					autoComplete="off"
				>
					<input
						onChange={onChangeHandler}
						name="chatText"
						id="chatText"
						className="chat__input-field"
						type="text"
						autoFocus
					/>
					<button type="submit" className="button button-chat">
						return
					</button>
				</form>
			</div>
		</div>
	);
}
