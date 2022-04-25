import "./NoteCard.scss";
import React from "react";
import { twelveHourTime, twentyFourHourTime } from "../../../utils/formatDate";
import { useSelector } from "react-redux";
import { selectFormat } from "../../CurrentTime/twelveHourFormatSlice";

export default function NoteCard({ note, openEditor, deleteNote }) {
	const twelveHourFormat = useSelector(selectFormat);

	return (
		<article className="note-card">
			<header className="note-card__header">
				<h2 className="note-card__title">{note.title}</h2>
				<div className="note-card__actions">
					<div
						className="note-card__action note-card__action--edit"
						onClick={() => {
							openEditor(note);
						}}
					>
						<i className="fa-solid fa-pen" />
					</div>
					<div
						className="note-card__action"
						onClick={() => {
							deleteNote(note.id);
						}}
					>
						<i className="fa-solid fa-trash-alt " />
					</div>
				</div>
			</header>
			<div className="note-card__timestamp">
				{twelveHourFormat
					? twelveHourTime(note.timestamp)
					: twentyFourHourTime(note.timestamp)}
			</div>
			<p className="note-card__note">{note.note}</p>
		</article>
	);
}
