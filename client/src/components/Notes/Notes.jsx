import "./Notes.scss";
import { useEffect, useState } from "react";
import AddEditNote from "./AddEditNote/AddEditNote";

export default function Notes() {
	const [noteHistory, setNoteHistory] = useState([]);
	const [twelveHourFormat, setTwelveHourFormat] = useState(true);
	const [visibility, setVisibility] = useState(true);

	let userNotes = JSON.parse(localStorage.getItem("notes"));
	if (userNotes === null) {
		localStorage.setItem("notes", "[]");
	}

	const handleNoteSubmit = (note) => {
		const noteObject = {
			id: JSON.parse(localStorage.getItem("notes")).length + 1,
			title: note.title,
			note: note.note,
			timestamp: Date.now(),
		};

		localStorage.setItem("notes", JSON.stringify([noteObject, ...userNotes]));
	};

	const deleteNote = (index) => {
		userNotes = userNotes.filter((el, i) => i !== index);
		setNoteHistory(userNotes);
		localStorage.setItem("notes", JSON.stringify(userNotes));
	};

	const showArchive = (event) => {
		event.preventDefault();
		noteHistory.length === 0 ? setNoteHistory(userNotes) : setNoteHistory([]);
		hideForm();
	};

	const hideForm = () => {
		visibility ? setVisibility(false) : setVisibility(true);
	};

	const timeFormatter = (timestamp) => {
		const time = new Date(timestamp);
		let hour = time.getHours();
		let min = time.getMinutes();
		if (hour < 10) {
			hour = "0" + hour;
		}
		if (min < 10) {
			min = "0" + min;
		}

		if (twelveHourFormat) {
			let meridiem = hour < 12 ? "AM" : "PM";
			hour = hour > 12 ? hour - 12 : hour;
			if (hour === "00") hour = 12;
			let time12hrFormat = `${hour}:${min} ${meridiem}`;
			return time12hrFormat;
		}
		return `${hour}:${min}`;
	};

	useEffect(() => {
		setNoteHistory(JSON.parse(localStorage.getItem("notes")));
	}, [noteHistory]);

	return (
		<div className="note-section">
			<button className="btn note-section__show-archive" onClick={showArchive}>
				{visibility ? (
					<i className="fa-solid fa-archive" />
				) : (
					<i className="fa-solid fa-times" />
				)}
			</button>
			{visibility ? (
				<div className="note-section__history">
					{noteHistory.map((note, i) => (
						<div className="note-card">
							<div>
								<h2 className="note-card__title">
									{note.title}{" "}
									<span className="note-card__timestamp">
										{timeFormatter(note.timestamp)}
									</span>{" "}
									<i
										onClick={() => {
											deleteNote(i);
										}}
										className="fa-solid fa-trash-alt note-card__delete"
									/>
								</h2>
							</div>
							<p className="note-card__note">{note.note}</p>
						</div>
					))}
				</div>
			) : (
				<AddEditNote handleNoteSubmit={handleNoteSubmit} />
			)}
		</div>
	);
}
