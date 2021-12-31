import { useState } from "react";

export default function UserNav() {
  const [currentNote, setCurrentNote] = useState("");
  const [currentNoteTitle, setCurrentNoteTitle] = useState("[Title]");
  const [savedNotes, setSavedNotes] = useState([]);


  const currentTime = new Date().getTime();

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    const noteObject = {
      title: currentNoteTitle,
      note: currentNote,
      timestamp: currentTime
    }

    setSavedNotes([...savedNotes, noteObject])
  }

  const listenForKeyUp = (event) => {
    console.log(event);
    if (event.key === "Meta") {

    }
  }

  const populateNote = (event) => {
    setCurrentNote(event.target.value);
  }

  const populateTitle = (event) => {
    setCurrentNoteTitle(event.target.value);
  }

  return (
    <section className="note-section">

      <form className="note-selection__form">

        <input type="text" defaultValue={currentNoteTitle}
          onChange={populateTitle}
          className="note-section__title" />

        <textarea
          onChange={populateNote}
          onKeyUp={listenForKeyUp} className="note-section__note" name="note"
          id="note">
        </textarea>

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