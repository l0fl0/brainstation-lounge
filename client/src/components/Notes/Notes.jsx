import './Notes.scss';
import { useState } from 'react';

export default function Notes() {
	const [currentNote, setCurrentNote] = useState('');
	const [currentNoteTitle, setCurrentNoteTitle] = useState('N/A');
	const [noteHistory, setNoteHistory] = useState([]);
	const [twelveHourFormat, setTwelveHourFormat] = useState(true);
	const [visibility, setVisibility] = useState(true);

	const currentTime = new Date().getTime();

	let userNotes = JSON.parse(localStorage.getItem('notes'));
	if (userNotes === null) {
		localStorage.setItem('notes', '[]');
	}

	const handleNoteSubmit = (event) => {
		event.preventDefault();
		const noteObject = {
			id: 0,
			title: currentNoteTitle,
			note: currentNote,
			timestamp: currentTime,
		};

		localStorage.setItem('notes', JSON.stringify([...userNotes, noteObject]));

		setCurrentNote('');
		setCurrentNoteTitle('N/A');
		event.target.reset();
	};

	const showArchive = (event) => {
		event.preventDefault();
		noteHistory.length === 0 ? setNoteHistory(userNotes) : setNoteHistory([]);
		hideForm();
	};

	const deleteNote = (index) => {
		userNotes = userNotes.filter((el, i) => i !== index);
		setNoteHistory(userNotes);
		localStorage.setItem('notes', JSON.stringify(userNotes));
	};

	const hideForm = () => {
		visibility ? setVisibility(false) : setVisibility(true);
	};

	const populateNote = (event) => {
		setCurrentNote(event.target.value);
	};

	const populateTitle = (event) => {
		setCurrentNoteTitle(event.target.value);
	};

	const timeFormatter = (timestamp) => {
		const time = new Date(timestamp);
		let hour = time.getHours();
		let min = time.getMinutes();
		if (hour < 10) {
			hour = '0' + hour;
		}
		if (min < 10) {
			min = '0' + min;
		}

		if (twelveHourFormat) {
			let meridiem = hour < 12 ? 'AM' : 'PM';
			hour = hour > 12 ? hour - 12 : hour;
			if (hour == '00') hour = 12;
			let time12hrFormat = `${hour}:${min} ${meridiem}`;
			return time12hrFormat;
		}
		return `${hour}:${min}`;
	};

	return (
		<div className='note-section'>
			<button className='btn note-section__show-archive' onClick={showArchive}>
				{visibility ? <i className='fas fa-archive' /> : <i className='fas fa-times' />}
			</button>
			{visibility ? (
				<form className='note-section__form' onSubmit={handleNoteSubmit}>
					<div className='note-section__title-container'>
						<input className='note-section__title' type='text' placeholder='Title your note' onChange={populateTitle} name='title' id='title' />
						<button type='submit' className='btn note-section__save-note'>
							<i className='far fa-save' />
						</button>
					</div>
					<textarea className='note-section__note' placeholder='Write your note here' onChange={populateNote} name='note' id='note'></textarea>
				</form>
			) : (
				<div className='note-section__history'>
					{noteHistory.map((note, i) => (
						<div className='note-card'>
							<div>
								<h2 className='note-card__title'>
									{note.title} <span className='note-card__timestamp'>{timeFormatter(note.timestamp)}</span>{' '}
									<i
										onClick={() => {
											deleteNote(i);
										}}
										className='far fa-trash-alt note-card__delete'
									/>
								</h2>
							</div>
							<p className='note-card__note'>{note.note}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
