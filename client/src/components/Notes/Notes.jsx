import "./Notes.scss";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import AddEditNote from "./AddEditNote/AddEditNote";
import NoteCard from "./NoteCard/NoteCard";
// TODO: title on form needs to end before the actions
// TODO: delete needs to be fixed
// TODO: add edit button to form

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
		const updatedNotes = [noteObject, ...noteHistory];
		localStorage.setItem("notes", JSON.stringify(updatedNotes));
		setNoteHistory(updatedNotes);
		setVisibility(true);
	};

	const editNote = (note) => {
		const updatedNotes = noteHistory.map(
			(obj) => [note].find((el) => el.id === obj.id) || obj
		);
		setCurrentNote(null);
		setNoteHistory(updatedNotes);
		setVisibility(true);
	};

	const deleteNote = (id) => {
		let filteredNotes = noteHistory.filter((el) => el.id !== id);
		localStorage.setItem("notes", JSON.stringify(filteredNotes));
		setNoteHistory(filteredNotes);
	};

	const openEditor = (note) => {
		setCurrentNote(note);
		setVisibility(false);
	};

	const toggleForm = (event) => {
		event.preventDefault();
		setCurrentNote(null);
		visibility ? setVisibility(false) : setVisibility(true);
	};

	useEffect(() => {
		let userNotes = getNotes();
		if (userNotes.length === 0) {
			localStorage.setItem("notes", "[]");
		}
		setNoteHistory(getNotes());
	}, []);

	const getNotes = () => {
		return JSON.parse(localStorage.getItem("notes"));
	};

	// render if there are no notes stored
	if (noteHistory.length === 0 && visibility) {
		return (
			<div className="note-section">
				<button className="note-section__edit-note" onClick={toggleForm}>
					<i className="fa-solid fa-pen" />
				</button>
				<div className="note-section__info">
					<h2>You have no notes stored!</h2>
					<p>Create a note by clicking the button in the top right corner.</p>
				</div>
			</div>
		);
	}
	return (
		<div className="note-section">
			{visibility ? (
				<section className="note-section__archive">
					<header className="note-section__header">
						<h2>Note History</h2>
						<button className="note-section__add-note" onClick={toggleForm}>
							<i className="fa-solid fa-pen" />
						</button>
					</header>
					<section className="note-section__history">
						{noteHistory.map((note) => (
							<NoteCard
								note={note}
								deleteNote={deleteNote}
								openEditor={openEditor}
							/>
						))}
					</section>
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
