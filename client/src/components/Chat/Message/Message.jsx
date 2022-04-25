import "./Message.scss";
import { twelveHourTime, twentyFourHourTime } from "../../../utils/formatDate";
import { useSelector } from "react-redux";
import { selectFormat } from "../../CurrentTime/twelveHourFormatSlice";

export default function Message({ message, isSelf }) {
	const { user, text, timestamp, type } = message;

	const twelveHourFormat = useSelector(selectFormat);

	if (type === "server") {
		return <p className="message__announcement">{text}</p>;
	}

	if (isSelf) {
		return (
			<div className="message__self">
				<p className="message__text">{text}</p>
				<div
					className={`message__time ${
						twelveHourFormat ? "message__time--meridian" : ""
					}`}
				>
					{twelveHourFormat
						? twelveHourTime(timestamp)
						: twentyFourHourTime(timestamp)}
				</div>
			</div>
		);
	}

	return (
		<div className="message">
			<div>
				<p className="message__user">{user}</p>
				<p className="message__text">{text}</p>
			</div>
			<div
				className={`message__time ${
					twelveHourFormat ? "message__time--meridian" : ""
				}`}
			>
				{twelveHourFormat
					? twelveHourTime(timestamp)
					: twentyFourHourTime(timestamp)}
			</div>
		</div>
	);
}
