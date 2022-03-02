import React from "react";
import "./AddEditNote.scss";

export default function AddEditNote({ handleNoteSubmit }) {
	const noteData = (e) => {
		e.preventDefault();
		const data = {
			title: e.target[0].value,
			note: e.target[2].value,
		};
		e.target.reset();
		handleNoteSubmit(data);
	};
	return (
		<form className="note-form" onSubmit={noteData}>
			<div className="note-form__title-container">
				<input
					className="note-form__title"
					type="text"
					placeholder="Title your note"
					name="title"
					id="title"
					key="title"
				/>
				<button type="submit" className="btn note-form__save-note">
					<i className="fa-solid fa-save" />
				</button>
			</div>
			<textarea
				className="note-form__note"
				placeholder="Write your note here"
				name="note"
				id="note"
			></textarea>
		</form>
	);
}
