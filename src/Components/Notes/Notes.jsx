import "./Notes.scss";
import { useState } from "react";

export default function Notes() {
  const [currentNote, setCurrentNote] = useState("");
  const [currentNoteTitle, setCurrentNoteTitle] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  const currentTime = new Date().getTime();

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    const noteObject = {
      title: currentNoteTitle,
      note: currentNote,
      timestamp: currentTime,
    };
    setSavedNotes([...savedNotes, noteObject]);
    event.target.reset();
  };

  const populateNote = (event) => {
    setCurrentNote(event.target.value);
  };

  const populateTitle = (event) => {
    setCurrentNoteTitle(event.target.value);
  };

  return (
    <section className="note-section">
      <form className="note-section__form" onSubmit={handleNoteSubmit}>
        <div>
          <input
            className="note-section__title"
            type="text"
            placeholder="Title your note"
            onChange={populateTitle}
          />
          <i className="far fa-trash-alt" />
        </div>
        <textarea
          className="note-section__note"
          placeholder="Write your note here"
          onChange={populateNote}
          name="note"
          id="note"
        ></textarea>

        <button type="submit">
          Finish
          <i className="far fa-paper-plane" />
        </button>
      </form>

      <div className="note-section__history">
        {savedNotes.map((note) => (
          <div>
            <h2>{note.title}</h2>
            <span>{note.timestamp}</span>
            <p>{note.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
