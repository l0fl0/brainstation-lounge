import "./Message.scss";

export default function Message({ message, isSelf }) {
	const { user, text, timestamp } = message;
	return (
		<div className={isSelf ? "message message--self" : "message"}>
			<p className="message__user">
				{user} <span className="message__time">{timestamp}</span>
			</p>
			<p className="message__text">{text}</p>
		</div>
	);
}
