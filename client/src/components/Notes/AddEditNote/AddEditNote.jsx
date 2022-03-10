import React from "react";
import "./AddEditNote.scss";

export default function AddEditNote({
	createNote,
	editNote,
	showArchive,
	currentNote,
}) {
	const noteData = (e) => {
		e.preventDefault();
		if (currentNote) {
			const data = {
				id: currentNote.id,
				title: e.target[0].value,
				note: e.target[3].value,
				timestamp: currentNote.timestamp,
			};
			editNote(data);
		}

		if (!currentNote) {
			const data = {
				title: e.target[0].value,
				note: e.target[3].value,
			};
			createNote(data);
		}

		e.target.reset();
	};
	return (
		<form className="note-form" onSubmit={noteData}>
			<header className="note-form__header">
				<div className="note-form__title-container">
					<textarea
						className="note-form__title"
						placeholder="Title your note"
						name="title"
						id="title"
						defaultValue={currentNote ? currentNote.title : null}
					></textarea>
				</div>
				<button type="submit" className="btn note-form__save-note">
					<i className="fa-solid fa-save" />
				</button>
				<button className="note-form__show-archive" onClick={showArchive}>
					<i className="fa-solid fa-times" />
				</button>
			</header>
			<textarea
				className="note-form__note"
				placeholder="Write your note here"
				name="note"
				id="note"
				defaultValue={currentNote ? currentNote.note : null}
			></textarea>
		</form>
	);
}
