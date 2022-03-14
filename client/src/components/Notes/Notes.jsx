import "./Notes.scss";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import AddEditNote from "./AddEditNote/AddEditNote";
import NoteCard from "./NoteCard/NoteCard";

export default function Notes() {
	const [noteHistory, setNoteHistory] = useState([]);
	const [visibility, setVisibility] = useState(true);
	const [currentNote, setCurrentNote] = useState(null);

	const createNote = (note) => {
		const noteObject = {
			id: uuid(),
			title: note.title,
			note: note.note,
			timestamp: Date.now(),
		};

		setNoteHistory([noteObject, ...noteHistory]);
		toggleForm();
	};

	const editNote = (note) => {
		const updatedNotes = noteHistory.map(
			(obj) => [note].find((el) => el.id === obj.id) || obj
		);
		setNoteHistory(updatedNotes);
		toggleForm();
	};

	const deleteNote = (id) => {
		let filteredNotes = noteHistory.filter((el) => el.id !== id);
		setNoteHistory(filteredNotes);
	};

	const openEditor = (note) => {
		setCurrentNote(note);
		setVisibility(false);
	};

	const toggleForm = (event) => {
		if (event) event.preventDefault();
		setCurrentNote(null);
		setVisibility(!visibility);
	};

	useEffect(() => {
		let userNotes = getNotes();
		if (userNotes.length === 0) {
			localStorage.setItem("notes", "[]");
		}
		setNoteHistory(getNotes());
	}, []);

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(noteHistory));
	}, [noteHistory]);

	const getNotes = () => {
		return JSON.parse(localStorage.getItem("notes"));
	};

	return (
		<div className="note-section">
			{visibility ? (
				<section className="note-section__archive">
					<header className="note-section__header">
						<h2>Notes</h2>
						<button className="note-section__add-note" onClick={toggleForm}>
							<i className="fa-solid fa-plus" />
						</button>
					</header>
					{noteHistory.length === 0 ? (
						// render if there are no notes stored
						<div className="note-section__info">
							<h3>You have no stored notes!</h3>
							<p>
								Create a note by clicking the button in the top right corner.
							</p>
						</div>
					) : (
						<section className="note-section__history">
							{noteHistory.map((note) => (
								<NoteCard
									note={note}
									deleteNote={deleteNote}
									openEditor={openEditor}
								/>
							))}
						</section>
					)}
				</section>
			) : (
				<AddEditNote
					createNote={createNote}
					editNote={editNote}
					showArchive={toggleForm}
					currentNote={currentNote}
				/>
			)}
		</div>
	);
}
