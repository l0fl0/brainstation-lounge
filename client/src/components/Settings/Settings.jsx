import "./Settings.scss";
import { gifLength } from "../../data/gifs";
import React, { useEffect } from "react";

export default function Settings({
	gifIndex,
	setGifIndex,
	twelveHourFormat,
	setTwelveHourFormat,
}) {
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

	useEffect(() => {
		const CurrentSettings = {
			// Add setting
			twelveHourFormat: twelveHourFormat,
			gifIndex: gifIndex,
		};

		localStorage.setItem("settings", JSON.stringify(CurrentSettings));
		// Add setting state to watch
	}, [gifIndex, twelveHourFormat]);

	return (
		<div className="settings">
			<h2 className="settings__title">Settings</h2>
			<section className="settings__item">
				24 hour Format
				<input
					onClick={() => setTwelveHourFormat(!twelveHourFormat)}
					type="checkbox"
					className="settings__toggle-switch"
					checked={!twelveHourFormat}
				/>
			</section>
			<section className="settings__item settings__bg-selector">
				change vibe
				<div className="settings__bg-selector-actions">
					<div onClick={prevGif} className="settings__bg-selector-icon">
						<i className="fa-solid fa-arrow-left"></i>
					</div>
					<div onClick={nextGif} className="settings__bg-selector-icon">
						<i className="fa-solid fa-arrow-right "></i>
					</div>
				</div>
			</section>
		</div>
	);
}
