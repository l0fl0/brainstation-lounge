import "./Settings.scss";
import { gifLength } from "../../data/gifs";
import { StrictMode, useEffect, useState } from "react";

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
			<div className="settings__item settings__toggle">
				24 hour Format
				<input
					onClick={() => setTwelveHourFormat(!twelveHourFormat)}
					type="checkbox"
					className="settings__toggle-switch"
					checked={!twelveHourFormat}
				/>
			</div>
			<section className="settings__item settings__bg-selector">
				change vibe
				<div className="settings__bg-selector-actions">
					<div onClick={prevGif}>
						<i className="fa-solid fa-arrow-left settings__bg-selector-icon"></i>
					</div>
					<div onClick={nextGif}>
						<i className="fa-solid fa-arrow-right settings__bg-selector-icon"></i>
					</div>
				</div>
			</section>
		</div>
	);
}
