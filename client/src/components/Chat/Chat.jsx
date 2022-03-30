import "./Chat.scss";
import { useState, useEffect, useContext, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Message from "./Message/Message";
import { SocketContext } from "../../context/socket";

export default function Chat({ twelveHourFormat }) {
	const socket = useContext(SocketContext);
	let [msgs, setMsgs] = useState([]);
	const [msgInput, setMsgInput] = useState("");

	const broadcastMessage = useCallback(
		(message) => {
			// send message to server for broadcast
			socket.emit("send-chat-message", {
				key: message.key,
				user: JSON.parse(localStorage.getItem("identification")).username,
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
			timestamp: Date.now(),
		};

		setMsgs([userMessage, ...msgs]);
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
		if (!localStorage.getItem("messages")) {
			localStorage.setItem("messages", "[]");
		}
		setMsgs(JSON.parse(localStorage.getItem("messages")));
	}, []);

	useEffect(() => {
		// send new user event
		socket.emit("join-chat", localStorage.getItem("username"));

		// Subscribe to events
		socket.on("chat-message", (data) => {
			setMsgs([data, ...JSON.parse(localStorage.getItem("messages"))]);
		});

		return () => {
			socket.off("chat-message");
			socket.emit("leave-chat", localStorage.getItem("username"));
		};
	}, [socket]);

	useEffect(() => {
		localStorage.setItem("messages", JSON.stringify(msgs));
	}, [msgs]);

	return (
		<div className="chat">
			<div className="chat__text">
				{msgs.map((message) => (
					<Message
						key={message.key}
						message={message}
						isSelf={message.currentUser}
						twelveHourFormat={twelveHourFormat}
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
				</form>
			</div>
		</div>
	);
}
