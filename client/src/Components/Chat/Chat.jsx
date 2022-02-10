import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Chat.scss";
import formatTime from "../../utils/formatDate";
import Message from "../Message/Message";

export default function Chat() {
	const [msgs, setMsgs] = useState([]);
	const [msgInput, setMsgInput] = useState("");
	const [socket, setSocket] = useState(io("http://localhost:8080"));

	// Like a componentDidMount lifecycle method
	useEffect(() => {
		let username = null;
		// sets username on Component mount for chat / saves username per session
		if (!sessionStorage.getItem("username")) {
			username = prompt("What is your name? ");
			sessionStorage.setItem("username", username);

			// send welcome message when user opens chatroom
			setMsgs([
				{
					text: "Welcome " + sessionStorage.getItem("username"),
					timestamp: formatTime(Date()),
				},
			]);
		} else {
			username = sessionStorage.getItem("username");

			// send welcome message when user opens chatroom
			setMsgs([
				{
					text: "Welcome Back " + sessionStorage.getItem("username"),
					timestamp: formatTime(Date()),
				},
			]);
		}

		return socket.disconnect();
	}, []);

	const addMessage = (event) => {
		event.preventDefault();
		// if no txt then return
		//TODO: add regex validation for white space input
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

		// sets both state and form input to empty string no empty messages
		event.target.chatText.value = "";
		setMsgInput("");
	};

	const messageBuilder = (msgs) => {
		const messageList = msgs.map((message, i) => {
			return <Message key={i} message={message} isSelf={message.currentUser} />;
		});
		return messageList;
	};

	const onChangeHandler = (event) => {
		setMsgInput(event.target.value);
	};
	return (
		<div className="chat">
			<div className="chat__text">{messageBuilder(msgs)}</div>
			<div className="chat__input">
				<i className="fas fa-user" />
				<form onSubmit={addMessage} className="chat__form" autoComplete="off">
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
