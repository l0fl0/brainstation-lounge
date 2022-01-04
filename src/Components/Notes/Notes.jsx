import "./Notes.scss";
import { useState } from "react";

export default function Notes() {
  const [currentNote, setCurrentNote] = useState("");
  const [currentNoteTitle, setCurrentNoteTitle] = useState("N/A");
  const [noteHistory, setNoteHistory] = useState([]);

  const currentTime = new Date().getTime();

  let userNotes = JSON.parse(localStorage.getItem("notes"));
  if (userNotes === null) {
    localStorage.setItem("notes", "[]");
  }

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    const noteObject = {
      id: 0,
      title: currentNoteTitle,
      note: currentNote,
      timestamp: currentTime,
    };

    localStorage.setItem("notes", JSON.stringify([...userNotes, noteObject]));

    setCurrentNote("");
    setCurrentNoteTitle("N/A");
    event.target.reset();
  };

  const showArchive = (event) => {
    event.preventDefault();
    noteHistory.length === 0 ? setNoteHistory(userNotes) : setNoteHistory([]);
  };

  const populateNote = (event) => {
    setCurrentNote(event.target.value);
  };

  const populateTitle = (event) => {
    setCurrentNoteTitle(event.target.value);
  };

  return (
    <div className="note-section">
      <form className="note-section__form" onSubmit={handleNoteSubmit}>
        <div className="note-section__title-container">
          <input
            className="note-section__title"
            type="text"
            placeholder="Title your note"
            onChange={populateTitle}
            name="title"
            id="title"
          />
          <button type="submit" className="btn note-section__save-note">
            <i className="far fa-save" />
          </button>
        </div>
        <textarea
          className="note-section__note"
          placeholder="Write your note here"
          onChange={populateNote}
          name="note"
          id="note"
        ></textarea>
        <button className="btn" onClick={showArchive}>
          <i className="fas fa-archive"></i>
        </button>
      </form>

      <div className="note-section__history">
        {noteHistory.map((note) => (
          <div className="note-card">
            <h2 className="note-card__title">{note.title}</h2>
            <span className="note-card__timestamp">{note.timestamp}</span>
            <p className="note-card__note">{note.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
