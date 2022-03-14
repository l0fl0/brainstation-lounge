import "./Message.scss";
import formatTime from "../../../utils/formatDate";

export default function Message({ message, isSelf }) {
	const { user, text, timestamp, type } = message;

	if (type === "server") {
		return <p className="message__announcement">{text}</p>;
	}

	if (isSelf) {
		return (
			<div className="message__self">
				<p className="message__text">
					{text}
					<span className="message__time">{formatTime(timestamp)}</span>
				</p>
			</div>
		);
	}

	return (
		<div className="message">
			<>
				<p className="message__user">{user}</p>
				<p className="message__text">
					{text}
					<span className="message__time">{formatTime(timestamp)}</span>
				</p>
			</>
		</div>
	);
}
