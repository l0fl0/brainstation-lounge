import "./Settings.scss";
import { gifLength } from "../../data/gifs";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/socket";

export default function Settings({
	gifIndex,
	setGifIndex,
	twelveHourFormat,
	setTwelveHourFormat,
}) {
	const socket = useContext(SocketContext);
	const [username, setUsername] = useState("");

	const nextGif = () => {
		setGifIndex((prevIndex) => {
			return (prevIndex + 1) % gifLength;
		});
	};

	const prevGif = () => {
		setGifIndex((prevIndex) => {
			if (prevIndex === 0) return gifLength - 1;
			return (prevIndex - 1) % gifLength;
		});
	};

	const onChangeHandler = async (e) => {
		setUsername(e.target.value);
	};

	const onEnter = (e) => {
		//TODO: add validation to input
		if (e.key === "Enter") {
			e.stopPropagation();
			// signs new JWT to store identification
			socket.emit("change-username", username);
		}
	};

	useEffect(() => {
		const CurrentSettings = {
			// Add setting
			twelveHourFormat: twelveHourFormat,
			gifIndex: gifIndex,
		};
		localStorage.setItem("settings", JSON.stringify(CurrentSettings));

		// Add setting state to watch
	}, [gifIndex, twelveHourFormat]);

	useEffect(() => {
		let identification = JSON.parse(localStorage.getItem("identification"));
		setUsername(identification.username);
	}, []);

	return (
		<div className="settings">
			<h2 className="settings__title">Settings</h2>
			<section className="settings__item">
				Username
				<input
					className="settings__username-input"
					type="text"
					value={username}
					onChange={onChangeHandler}
					onKeyDown={onEnter}
					title="hit enter to save name"
				/>
			</section>
			<section className="settings__item">
				24 hour Format
				<input
					onClick={() => setTwelveHourFormat(!twelveHourFormat)}
					type="checkbox"
					className="settings__toggle-switch"
					defaultChecked={!twelveHourFormat}
				/>
			</section>
			<section className="settings__item settings__bg-selector">
				change vibe
				<div className="settings__bg-selector-actions">
					<div
						onClick={prevGif}
						className="settings__bg-selector-icon"
						title="previous gif"
					>
						<i className="fa-solid fa-arrow-left"></i>
					</div>
					<div
						onClick={nextGif}
						className="settings__bg-selector-icon"
						title="next gif"
					>
						<i className="fa-solid fa-arrow-right "></i>
					</div>
				</div>
			</section>
		</div>
	);
}
