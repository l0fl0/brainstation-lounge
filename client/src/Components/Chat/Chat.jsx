import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./Chat.scss";
import formatTime from "../../utils/formatDate";
import Message from "../Message/Message";

// set a global immutable for the socket connection
const socket = io("http://localhost:8080");

export default function Chat() {
	// State
	const [msgs, setMsgs] = useState([]);
	const [msgInput, setMsgInput] = useState("");

	// Socket listeners
	//
	// handle incomming message display
	socket.on("connect", () => {
		console.log("connected");
	});

	socket.on("chat-message", (data) => {
		setMsgs([data, ...msgs]);
	});

	socket.on("disconnect", (reason) => {
		console.log(reason);

		if (reason === "io server disconnect") {
			// the disconnection was initiated by the server, you need to reconnect manually
			socket.connect();
		}
		if (reason === "transport close") {
			// the disconnection was initiated by the server, you need to reconnect manually
			socket.connect();
		}
	});

	// Similar componentDidMount lifecycle method
	useEffect(() => {
		// sets username on Component mount for chat / saves username per session
		if (!sessionStorage.getItem("username")) {
			sessionStorage.setItem("username", prompt("What is your name? "));
		}
		// connect to the new user function
		socket.emit("new-user", sessionStorage.getItem("username"));

		// The return functions as the componentWillUnmount lifecycle method
		return () => {
			socket.disconnect();
		};
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();
		if (!msgInput || !event.target.chatText.value) return;

		// update user view with message
		setMsgs([
			{
				currentUser: true,
				text: msgInput,
				timestamp: formatTime(Date()),
			},
			...msgs,
		]);

		// send message to server for broadcast
		socket.emit("send-chat-message", {
			user: sessionStorage.getItem("username"),
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

	//TODO: scroll position tracking for chat close
	return (
		<div className="chat">
			<div className="chat__text">
				//TODO: new mesage adds a new component to the array of messages
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
