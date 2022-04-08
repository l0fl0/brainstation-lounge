import "./CurrentTime.scss";
import { useState, useEffect } from "react";
import {
	getDay,
	twelveHourTime,
	twentyFourHourTime,
} from "../../utils/formatDate";

export default function CurrentTime({ twelveHourFormat }) {
	const [currentTime, setCurrentTime] = useState("00:00:00");
	const [dayOfWeek, setDayOfWeek] = useState("TODAY");

	useEffect(() => {
		const getTime = setInterval(() => {
			const timestamp = Date.now();

			setDayOfWeek(getDay(timestamp));
			setCurrentTime(
				twelveHourFormat
					? twelveHourTime(timestamp, true)
					: twentyFourHourTime(timestamp, true)
			);
		}, 1000);

		return () => clearInterval(getTime);
	}, [twelveHourFormat]);

	return (
		<div>
			<h2 className="toolbar__time">{currentTime}</h2>
			<div className="toolbar__day">{dayOfWeek}</div>
		</div>
	);
}
